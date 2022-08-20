import { Router } from 'express'

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController'

export const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.post('/', createUserController.handle)
