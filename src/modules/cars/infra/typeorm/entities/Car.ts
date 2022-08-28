import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Category } from './Category'

@Entity('cars')
export class Car {
  @PrimaryColumn('uuid')
    id!: string

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    daily_rate!: number

  @Column()
    license_plate!: string

  @Column()
    fine_amount!: number

  @Column({ default: true })
    available!: boolean

  @Column()
    brand!: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
    category!: Category

  @Column()
    category_id!: string

  @CreateDateColumn()
    created_at!: Date

  constructor () {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
