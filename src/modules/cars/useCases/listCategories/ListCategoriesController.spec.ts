import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('List Categories Controller', () => {
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

  it('should be able to list all available categories', async () => {
    const sessionsResponse = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { refresh_token } = sessionsResponse.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest'
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      })

    const categoriesResponse = await request(app).get('/categories')

    expect(categoriesResponse.status).toBe(200)
    expect(categoriesResponse.body.length).toBe(1)
    expect(categoriesResponse.body[0]).toMatchObject({
      name: 'Category Supertest',
      description: 'Category Supertest'
    })
  })
})
