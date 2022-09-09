import { v4 as uuiV4 } from 'uuid'

export class Rental {
  id!: string

  car_id!: string

  user_id!: string

  start_date!: Date

  end_date!: Date

  expected_return_date!: Date

  total!: number

  created_at!: Date

  updated_at!: Date

  constructor () {
    if (!this.id) {
      this.id = uuiV4()
    }
  }
}
