import { container } from 'tsyringe'

import { LocalStorageProvider } from './implementations/LocalStorageProvider'
import { S3StorageProvider } from './implementations/S3StorageProvider'
import { IStorageProvider } from './IStorageProvider'

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

const currentDisk = process.env.disk as keyof typeof diskStorage

container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage[currentDisk])
