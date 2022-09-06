import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { CarImage } from './CarImage'
import { Category } from './Category'
import { Specification } from './Specification'

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

  @Column()
    category_id!: string

  @CreateDateColumn()
    created_at!: Date

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
    category!: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
    specifications!: Specification[]

  @OneToMany(() => CarImage, (carImage) => carImage.car)
    carImage!: CarImage

  constructor () {
    if (!this.id) {
      this.id = uuidV4()
    }

    if (this.available === undefined) {
      this.available = true
    }
  }
}
