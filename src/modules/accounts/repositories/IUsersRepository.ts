import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

export interface IUsersRepository {
  create(createUserDTO: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
}
