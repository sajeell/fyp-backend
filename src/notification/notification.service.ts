import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotificationDTO } from './dto/notification.dto'
import { Notification, NotificationDocument } from './notification.schema'
import * as nodemailer from 'nodemailer'

@Injectable()
export class NotificationService {
  constructor() {}

  async notifyUser(arg: NotificationDTO): Promise<void> {
    try {
      var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        // secure: true, // use SSL,
        // you can try with TLS, but port is then 587
        auth: {
          user: 'barganttic@gmail.com', // Your email id
          pass: 'wrtvcjauxidkzpdq', // Your password
        },
      }

      var transporter = nodemailer.createTransport(smtpConfig)
      // replace hardcoded options with data passed (somedata)
      var mailOptions = {
        from: 'barganttic@gmail.com', // sender address
        to: arg.receiverId, // list of receivers
        subject: 'Email', // Subject line
        text: arg.message, //, // plaintext body
        html: `<b>${arg.message}</b>`, // You can choose to send an HTML body instead
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
