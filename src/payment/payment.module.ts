import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { StripeModule } from '@golevelup/nestjs-stripe';
import { PaymentService } from './payment.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey:
        'sk_test_51KDoqbEsN7sDxXqJgpygRdpvrf5FVpKZ4L8lwqXShvZwLQx4pa5p195u5l0xUgbhG1Q8iO9U3GRjZYjiUrEIA0D500vq0yxX86',
    }),
    UserModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
