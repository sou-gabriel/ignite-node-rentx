import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider } from '../IMailProvider'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor () {
    nodemailer.createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(console.error)
  }

  async sendMail (to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const templateHTML = handlebars.compile(templateFileContent)(variables)

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreply@rentx.com.br>',
      subject,
      html: templateHTML
    })

    console.log('Message sent: ', message.messageId)
    console.log('Review URL: ', nodemailer.getTestMessageUrl(message))
  }
}
