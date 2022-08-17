import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

export interface IUsersRepository {
  create(createUserDTO: ICreateUserDTO): Promise<void>
}
