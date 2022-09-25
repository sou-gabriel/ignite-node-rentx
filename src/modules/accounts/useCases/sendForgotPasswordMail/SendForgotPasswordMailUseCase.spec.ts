import { AppError } from '@shared/errors/AppError'

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '../../repositories/in-memory/MailProviderInMemory'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await usersRepositoryInMemory.create({
      driver_license: '664168',
      email: 'john@doe.com',
      name: 'John Doe',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('john@doe.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('aush@mail.br')
    ).rejects.toEqual(new AppError('User does not exists!'))
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: '123@mail.com',
      name: 'Balanc Curry',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('123@mail.com')

    expect(generateTokenMail).toBeCalled()
  })
})
