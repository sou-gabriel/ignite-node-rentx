import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', '1234', 'true', 'now()')
  `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { token } = sessionsResponse.body

    const categoriesResponse = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest'
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(categoriesResponse.status).toBe(201)
  })

  it('should not be able to create a new category with name exists', async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { token } = sessionsResponse.body

    const categoriesResponse = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest'
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(categoriesResponse.status).toBe(400)
  })
})
