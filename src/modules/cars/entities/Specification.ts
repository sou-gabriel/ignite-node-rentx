import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('specifications')
export class Specification {
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
      this.id = uuidv4()
    }
  }
}
