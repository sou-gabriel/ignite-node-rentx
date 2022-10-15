import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UploadUserAvatarController } from '@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarController'
import { ProfileUserController } from '@modules/cars/useCases/profileUser/ProfileUserController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), uploadUserAvatarController.handle)
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)
