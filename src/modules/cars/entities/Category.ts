import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('categories')
export class Category {
  @PrimaryColumn('uuid')
    id?: string

  @Column()
    name!: string

  @Column()
    description!: string

  @CreateDateColumn()
    created_at!: Date

  constructor () {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
