import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions
} from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection({
    ...defaultOptions,
    database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
  } as ConnectionOptions)
}
