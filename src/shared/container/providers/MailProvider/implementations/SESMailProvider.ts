import { SES } from 'aws-sdk'
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider } from '../IMailProvider'

@injectable()
export class SESMailProvider implements IMailProvider {
  private client!: Transporter

  constructor () {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2'
      })
    })
  }

  async sendMail (to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)

    await this.client.sendMail({
      to: 'gabriel.apirentx.two@gmail.com',
      from: 'Rentx <gabriel.apirentx@gmail.com>',
      subject,
      html: templateParse(variables)
    })
  }
}
