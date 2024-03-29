import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { IntermediaryController } from './intermediary.controller';
import { Intermediary, IntermediarySchema } from './intermediary.schema';
import { IntermediaryService } from './intermediary.service';

@Module({
    controllers: [IntermediaryController],
    providers: [IntermediaryService],
    imports: [
        UserModule,
        ProductModule,
        MongooseModule.forFeature([{ name: Intermediary.name, schema: IntermediarySchema }]),
    ],
    exports: [IntermediaryService],
})
export class IntermediaryModule { }
