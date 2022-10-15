// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config'
import { container } from 'tsyringe'

import { IMailProvider } from './IMailProvider'
import { EtherealMailProvider } from './implementations/EtherealMailProvider'
import { SESMailProvider } from './implementations/SESMailProvider'

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}

const currentMailProvider = process.env.MAIL_PROVIDER as keyof typeof mailProvider

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[currentMailProvider]
)
