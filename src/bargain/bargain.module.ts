import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BargainController } from './bargain.controller';
import { Bargain, BargainSchema } from './bargain.schema';
import { BargainService } from './bargain.service';

@Module({
  controllers: [BargainController],
  exports: [BargainService],
  providers: [BargainService],
  imports: [
    MongooseModule.forFeature([{ name: Bargain.name, schema: BargainSchema }])
  ]
})
export class BargainModule { }
