import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://root:12345@fyp.iydmr.mongodb.net/FYP?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
