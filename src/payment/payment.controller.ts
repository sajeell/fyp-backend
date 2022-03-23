import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors,

} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';


import { PaymentService } from './payment.service';
import { PaymentIntentDto } from './dto/PaymentIntent.dto';
import { AddProviderCardDto } from './dto/AddProviderCard.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService, private userService: UserService,) { }

    //** Faclity Creation */
    @Post('')
    async createPaymentIntent(@Body() body: PaymentIntentDto): Promise<any> {
        const result = await this.paymentService.createPaymentIntent(body);
        return result;
    }

    @Post('provider')
    async createProviderStripeAccount(
        @Body() body: AddProviderCardDto,
    ): Promise<any> {
        // const token = await this.paymentService.createToken();
        const result = await this.paymentService.createAccount(body.userId, body);
        console.log(
            '🚀 ~ file: payment.controller.ts ~ line 51 ~ PaymentController ~ result',
            result,
        );

        return result;
    }

    @Post('make-customer')
    async createProviderStripeCustomer(
        @Body() body: { token, userId },
    ): Promise<any> {
        const { token, userId } = body
        // const token = await this.paymentService.createToken();
        const result = await this.paymentService.createStripeCustomerAndCard(
            userId,
            token,
        );

        console.log(
            '🚀 ~ file: payment.controller.ts ~ line 51 ~ PaymentController ~ result',
            result,
        );

        return result;
    }

    @Get('stats/:id')
    @ApiParam({
        name: 'id',
        required: true,
    })
    async paymentStats(@Param('id') id): Promise<any> {
        const result = await this.paymentService.dashBoardStats(id);
        return result;
    }

    @Get('user/created/stripeCustomer')
    async handleCreateStripeCustomerId(payload: {
        userId: string; //user email
    }) {
        try {
            const { id: stripeCustomerId } = await this.paymentService.createCustomer(
                payload.userId,
            );
            console.log(
                '🚀 ~ file: payment.listeners.ts ~ line 38 ~ PaymentListener ~ stripeCustomerId',
                stripeCustomerId,
            );

            const user = await this.userService.findOne(payload.userId);
            user.stripeCustomerId = stripeCustomerId;

            await this.userService.addStripeOneCustomerId(payload.userId, stripeCustomerId)
        } catch (error) {
            throw new BadRequestException('not created');
        }
    }
}