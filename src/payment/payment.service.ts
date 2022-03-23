import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'

import { InjectStripeClient } from '@golevelup/nestjs-stripe'
import Stripe from 'stripe'

import { PaymentIntentDto } from './dto/PaymentIntent.dto'
import { AddProviderCardDto } from './dto/AddProviderCard.dto'

import { UserService } from 'src/user/user.service'

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private userService: UserService,
  ) {}

  async createPaymentIntent(body: PaymentIntentDto): Promise<any> {
    try {
      const { amount } = body
      const result = await this.stripeClient.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
      })
      return { client_secret: result.client_secret }
    } catch (error) {
      console.log('::::::::::::::::::', error)
      throw new BadRequestException(`${error.raw.message}`)
    }
  }

  async createAccount(userId: string, body: AddProviderCardDto) {
    const {
      stripeToken,
      firstName,
      lastName,
      dob,
      ssnNumber,
      city,
      country,
      postal_code,
      line1,
      state,
      email,
      gender,
      phone,
      businessWebUrl,
    } = body

    const d = new Date(dob)
    try {
      const user = await this.userService.findOne(userId)

      const { id: stripeAccountId } = await this.stripeClient.accounts.create({
        type: 'custom',
        country: 'US',
        individual: {
          first_name: firstName,
          last_name: lastName,
          dob: {
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
          },
          ssn_last_4: ssnNumber,
          email,
          gender,
          phone,
        },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: 'individual',
        external_account: stripeToken,

        business_profile: {
          mcc: '7311',
          url: businessWebUrl,
        },
        tos_acceptance: {
          date: 1440516958,
          ip: '172.0.0.1',
        },
      })

      return this.userService.addStripeAccountId(user._id, stripeAccountId)
    } catch (error) {
      console.log(
        '🚀 ~ file: payment.service.ts ~ line 83 ~ PaymentService ~ createAccount ~ error',
        error,
      )

      let errMessage = ''

      if (error.raw.code == 'instant_payouts_unsupported') {
        errMessage =
          'This card is not eligible for Payouts. Try a debit card from a supported bank'
      } else if (error.raw.code == 'invalid_card_type') {
        errMessage =
          'This card does not appear to support payouts. Try different card'
      } else {
        errMessage = error.raw.message
      }
      throw new BadRequestException(errMessage)
    }
  }

  async createCustomer(description: string) {
    return await this.stripeClient.customers.create({
      description,
    })
  }

  async updateStripeAccountForManualPayout(
    stripeAccountId: string,
    delay_days: number,
  ) {
    try {
      await this.stripeClient.accounts.update(stripeAccountId, {
        settings: {
          payouts: { schedule: { interval: 'daily', delay_days } },
        },
      })
    } catch (error) {
      console.log(
        '🚀 ~ file: payment.service.ts ~ line 67 ~ PaymentService ~ error',
        error,
      )
    }
  }

  async findCustomer(query: any) {
    return await this.stripeClient.customers.list({
      email: query.email,
    })
  }

  // cards
  async createCard(source: string, customerId: string) {
    //source is stripe token
    return await this.stripeClient.customers.createSource(customerId, {
      source,
    })
  }

  async getCard(customerId: string, id: string) {
    //id is basically cardId
    return await this.stripeClient.customers.retrieveSource(customerId, id)
  }
  // payouts
  //id needs to be saved in db to retrieve it
  async createPayout(
    // destinationCardId: string,
    stripeAccount: string,
    amount: number,
  ) {
    try {
      return await this.stripeClient.payouts.create(
        {
          amount: parseInt(`${amount}`),
          currency: 'usd',
          // destination: destinationCardId,F
          method: 'standard',
          source_type: 'card',
        },
        {
          stripeAccount, // '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
        },
      )
    } catch (error) {
      console.log(
        '🚀 ~ file: payment.service.ts ~ line 113 ~ PaymentService ~ error',
        error,
      )
    }
  }

  async getPayout(payoutId: string) {
    return await this.stripeClient.payouts.retrieve(
      'po_1K85C72eZvKYlo2CGl3bidOS', //id of the payout saved in db
    )
  }

  async listPayouts() {
    return await this.stripeClient.payouts.list({
      limit: 20,
    })
  }
  //charge payment
  async createCharge(source: string, amount: number) {
    try {
      return await this.stripeClient.charges.create({
        amount,
        currency: 'usd',
        source,
        description: 'My First Test Charge (created for API docs)',
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.raw.message)
    }
    //stripe token
  }

  async cancelPayout(payoutId: string) {
    return await this.stripeClient.payouts.cancel('po_1K8Kox2eZvKYlo2CDkhI95ov')
  }

  // create strip Token for demo
  async createToken() {
    return await this.stripeClient.tokens.create({
      card: {
        cvc: '317',
        exp_month: '12',
        exp_year: '2022',
        name: 'tanzeel',
        number: '4000000000000077',
        currency: 'usd',
      },
    })
  }

  //crate stripe customer and card
  async createStripeCustomerAndCard(userId: string, stripeToken: string) {
    try {
      const user = await this.userService.findOne(userId)

      const { id: stripeCustomerId } = await this.createCustomer(user.username)
      console.log(
        '🚀 ~ file: payment.service.ts ~ line 145 ~ PaymentService ~ createStripeCustomerAndCard ~ stripeCustomerId',
        stripeCustomerId,
      )

      const { id: stripeCardId } = await this.createBankAccount(
        user.stripeAccountId,
        stripeToken,
      )

      console.log(
        '🚀 ~ file: payment.service.ts ~ line 272 ~ PaymentService ~ createStripeCustomerAndCard ~ stripeCardId',
        stripeCardId,
      )

      user.stripeCustomerId = stripeCustomerId
      user.stripeCardId = stripeCardId

      this.userService.addStripeCustomerId(
        user._id,
        stripeCustomerId,
        stripeCardId,
      )
    } catch (error) {
      console.log(
        '🚀 ~ file: payment.service.ts ~ line 168 ~ PaymentService ~ createStripeCustomerAndCard ~ error',
        error,
      )

      throw new BadRequestException('Not Created')
    }
  }

  //tester function
  async testerFunction(userId: string) {
    const { id: stripeToken } = await this.createToken()
    const result = await this.createStripeCustomerAndCard(userId, stripeToken)
    console.log(
      '🚀 ~ file: payment.service.ts ~ line 183 ~ PaymentService ~ testerFunction ~ result',
      result,
    )
  }

  async createBankAccount(accountId: string, stripeToken: string) {
    try {
      return await this.stripeClient.accounts.createExternalAccount(accountId, {
        external_account: stripeToken, //stripeToken
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async createTransfer(
    amount: number,
    destination: string,
    source_transaction: string,
  ) {
    try {
      return await this.stripeClient.transfers.create({
        amount,
        currency: 'usd',
        source_transaction,
        destination,
        transfer_group: 'ORDER_95',
      })
    } catch (error) {
      console.log('create transfer error', error)
      throw new BadRequestException(error.raw.message)

      // throw new InternalServerErrorException(error);
    }
  }
  async getStripeBalance(connectAccountId: string) {
    try {
      const balance = await this.stripeClient.balance.retrieve({
        stripeAccount: connectAccountId,
      })
      return balance
    } catch (error) {
      throw new BadRequestException(error.raw.message)
    }
  }

  async dashBoardStats(providerId: string) {
    const isProviderExist = await this.userService.findOne(providerId)
    const balance = await this.getStripeBalance(isProviderExist.stripeAccountId)
    let paymentBalance = { monthly: 0, annually: 0, pending: 0, available: 0 }
    return paymentBalance
  }
}
