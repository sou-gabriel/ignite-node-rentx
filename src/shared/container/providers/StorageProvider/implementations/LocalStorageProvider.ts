import fs from 'fs'
import { resolve } from 'path'

import upload from '@config/upload'

import { IStorageProvider } from '../IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  async save (folder: string, file: string) {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    )
  }

  async delete (folder: string, file: string) {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)

    try {
      await fs.promises.stat(filename)
    } catch (error) {
      return
    }

    await fs.promises.unlink(filename)
  }
}
