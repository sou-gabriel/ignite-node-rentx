import { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'

import upload from '@config/upload'

import { IStorageProvider } from '../IStorageProvider'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor () {
    this.client = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
      },
      region: process.env.AWS_BUCKET_REGION
    })
  }

  async save (folder: string, file: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.getType(originalName) as string

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise()

    await fs.promises.unlink(originalName)

    return file
  }

  async delete (folder: string, file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    }).promise()
  }
}
