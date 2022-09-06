import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Car } from './Car'

@Entity('car_images')
export class CarImage {
  @PrimaryColumn()
    id!: string

  @Column()
    car_id!: string

  @Column()
    image_name!: string

  @CreateDateColumn()
    created_at!: Date

  @ManyToOne(() => Car, (car) => car.carImage)
  @JoinColumn({ name: 'car_id' })
    car!: Car

  constructor () {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
