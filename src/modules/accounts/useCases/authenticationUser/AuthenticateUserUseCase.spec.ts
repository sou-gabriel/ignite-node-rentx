import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '00123',
      email: 'user@test.com',
      password: '1234',
      name: 'User test'
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: '1234'
      })
    }).rejects.toEqual(new AppError('Email or password incorrect!'))
  })

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '9999',
      email: 'user@user.com',
      password: '1234',
      name: 'User test error'
    }

    await createUserUseCase.execute(user)

    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password'
      })
    }).rejects.toEqual(new AppError('Email or password incorrect!'))
  })
})
