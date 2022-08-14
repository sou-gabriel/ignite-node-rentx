import { v4 as uuidv4 } from 'uuid'

export class Specification {
  id!: string
  created_at!: Date
  name!: string
  description!: string

  constructor (name: string, description: string) {
    this.name = name
    this.description = description

    if (!this.id) {
      this.id = uuidv4()
    }

    if (!this.created_at) {
      this.created_at = new Date()
    }
  }
}
