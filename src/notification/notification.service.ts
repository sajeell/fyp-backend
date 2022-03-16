import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotificationDTO } from './dto/notification.dto'
import { Notification, NotificationDocument } from './notification.schema'
import * as nodemailer from 'nodemailer'

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly model: Model<NotificationDocument>,
  ) {}

  async notifyUser(): Promise<void> {
    try {
      var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        // secure: true, // use SSL,
        // you can try with TLS, but port is then 587
        auth: {
          user: 'barganttic@gmail.com', // Your email id
          pass: 'Barganttic*0300', // Your password
        },
      }

      var transporter = nodemailer.createTransport(smtpConfig)
      // replace hardcoded options with data passed (somedata)
      var mailOptions = {
        from: 'barganttic@gmail.com', // sender address
        to: 'sajeel.ahmed@protonmail.com', // list of receivers
        subject: 'Test email', // Subject line
        text: 'this is some text', //, // plaintext body
        html: '<b>Hello world ✔</b>', // You can choose to send an HTML body instead
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          return false
        } else {
          console.log('Message sent: ' + info.response)
          return true
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}
