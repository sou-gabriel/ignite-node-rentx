import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  create(createUserDTO: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}
