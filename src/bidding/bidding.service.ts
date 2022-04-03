import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Response } from 'express'
import { Model } from 'mongoose'
import { listeners } from 'process'
import { NotificationService } from 'src/notification/notification.service'
import { ProductService } from 'src/product/product.service'
import { isNonNullExpression } from 'typescript'
import {
  BiddingParticipants,
  BiddingParticipantsDocument,
} from './bidding-participants.schema'
import { Bidding, BiddingDocument } from './bidding.schema'

@Injectable()
export class BiddingService {
  private startTime: Date = null
  constructor(
    private readonly notificationService: NotificationService,
    private readonly productService: ProductService,
    @InjectModel(Bidding.name) private readonly model: Model<BiddingDocument>,
    @InjectModel(BiddingParticipants.name)
    private readonly biddingParticipantsModel: Model<BiddingParticipantsDocument>,
  ) { }

  public setStartTime(startTimeArg): void {
    this.startTime = startTimeArg
  }

  private compare(
    a: {
      id: Number
      maxPrice: Number
      email: string
    },
    b: {
      id: Number
      maxPrice: Number
      email: string
    },
  ) {
    if (a.maxPrice < b.maxPrice) {
      return -1
    }
    if (a.maxPrice > b.maxPrice) {
      return 1
    }
    return 0
  }

  private checkForDeadlock(array: Array<any>) {
    let highestBid = array[array.length - 1]
    let count = 0

    array.forEach((element) => {
      if (element.maxPrice === highestBid.maxPrice) {
        count++
      }
    })

    if (count > 1) {
      return true
    } else {
      return false
    }
  }

  public async biddingStart(): Promise<any> {
    try {
      const biddingIDs: Array<string> = []

      const biddingsData = await this.model.find()

      const todaysDate = new Date()

      if (biddingsData && biddingsData.length > 0) {
        biddingsData.map((bidding) => {
          const startsOnDate = new Date(bidding.startsOn)

          let differenceInTime = todaysDate.getTime() - startsOnDate.getTime()

          let differenceInDays = differenceInTime / (1000 * 3600 * 24)

          if (differenceInDays === 0) {
            biddingIDs.push(bidding._id)
          }
        })
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }

      if (biddingIDs && biddingIDs.length > 0) {
        biddingIDs.map(async (id) => {
          const biddingDetail = await this.fetchBiddingDetails(id.valueOf())

          if (
            biddingDetail.participants &&
            biddingDetail.participants.length > 1
          ) {
            const durationInSeconds = biddingDetail.duration
            let endTime = new Date()
            let difference = endTime.getTime() - this.startTime.getTime()
            let resultInSeconds = Math.round(difference / 1000)

            let participants = biddingDetail.participants

            const minPrice = biddingDetail.minPrice
            const incrementPrice = biddingDetail.incrementPrice
            let currentPrice = 0

            let sortedArray = participants.sort(this.compare)
            let checkForDeadlock = this.checkForDeadlock(sortedArray)

            if (checkForDeadlock === true) {
              return new HttpException('Deadlock', HttpStatus.NOT_FOUND)
            }

            while (resultInSeconds < durationInSeconds) {
              if (currentPrice === 0) {
                currentPrice = minPrice
              } else {
                currentPrice = currentPrice + incrementPrice
              }

              participants = participants.map((element) => {
                const incrementValue = currentPrice + incrementPrice
                if (incrementValue <= element.maxBidPrice) {
                  element.currentBid = incrementValue
                }
                return element
              })

              sortedArray = participants.sort(this.compare)

              checkForDeadlock = this.checkForDeadlock(sortedArray)
              if (checkForDeadlock === true) {
                return false
              }

              endTime = new Date()
              difference = endTime.getTime() - this.startTime.getTime()
              resultInSeconds = Math.round(difference / 1000)
            }

            const highestBid = sortedArray[sortedArray.length - 1]

            this.notificationService.notifyUser({
              isFromAdmin: true,
              senderId: 'admin',
              receiverId: highestBid.email,
              message: `You have won the bidding #${id}`,
            })

            return sortedArray[sortedArray.length - 1]
          } else {
            return null
          }
        })
      } else {
        throw new HttpException('Bidding IDs not found', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addBiddingDetails(dataArg): Promise<any> {
    try {
      const data = await new this.model({
        ...dataArg,
        createdAt: new Date(),
      })

      return data
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async addBiddingParticipant(dataArg): Promise<any> {
    try {
      const data: any = await new this.biddingParticipantsModel({
        ...dataArg,
        createdAt: new Date(),
      }).save()

      return data
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async fetchBiddingParticipant(id: string): Promise<any> {
    const data = await this.biddingParticipantsModel
      .find({
        userID: id,
      })
      .catch((error) => {
        console.error(error)
      })

    return data
  }

  public async fetchBiddingDetails(id: string): Promise<any> {
    let serverResponse: any = null

    await this.model
      .find({
        _id: id,
      })
      .exec()
      .then(async (biddingDetailsResponse: any) => {
        const data = await this.biddingParticipantsModel
          .find({
            biddingID: biddingDetailsResponse[0]._id,
          })
          .then((response) => {
            biddingDetailsResponse[0].participants = response
            serverResponse = biddingDetailsResponse[0]?.toJSON()
            return
          })
          .catch((error) => {
            console.error(error)
            throw new HttpException(
              error.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            )
          })
      })
      .catch((error) => {
        console.error(error)
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })

    return serverResponse
  }

  public async checkUserHadBidOrNot(
    userID: string,
    productID: string,
    res: Response
  ): Promise<any> {
    try {
      const biddingData = await this.model.find({
        productID: productID,
      })

      const validateUserBidding = await this.biddingParticipantsModel.find({
        biddingID: biddingData[0]._id,
        userID: userID,
      })

      if (validateUserBidding && validateUserBidding.length > 0) {
        res.status(200).json({ verified: true })
      } else {
        res.status(404).json({ verified: false })
      }

    } catch (error) {
      res.status(404).json({ verified: false })
    }
  }

  public async fetchBuyerCartDetails(userID: string, res: Response): Promise<any> {
    const biddingIDs: Array<string> = []
    let biddings: Array<Object> = []

    const participatedBiddings = await this.biddingParticipantsModel.find({
      userID: userID,
    })

    if (participatedBiddings && participatedBiddings.length > 0) {
      participatedBiddings.map((bidding) => {
        biddingIDs.push(bidding.biddingID)
      })

      const myPromise = new Promise(async (resolve, reject) => {
        const biddingsTemp = biddingIDs.map(async (id) => {
          const bidding = await this.model.findById(id)
          const product = await this.productService.findOneById(bidding.productID)

          const combinedResponse = {
            bidding: bidding,
            product: product,
          }

          return combinedResponse
        })

        biddings = (await Promise.all(biddingsTemp))
        resolve(biddings)
      });

      myPromise.then((data: any) => {
        res.status(200).json(data)
      })
        .catch((error) => {
          console.error(error)
        })

    } else {
      res.status(404).json({ error: "Not Found" })
    }
  }
}
