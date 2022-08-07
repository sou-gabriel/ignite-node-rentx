import { parse } from 'csv-parse'
import fs from 'fs'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

export class ImportCategoryUseCase {
  constructor (private categoriesRepository: ICategoriesRepository) { }

  loadCategories (file: Express.Multer.File): Promise< IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      const stream = fs.createReadStream(file.path)
      const parseFile = parse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async line => {
          const [name, description] = line

          categories.push({
            name,
            description
          })
        }).on('end', () => {
          resolve(categories)
        }).on('error', error => {
          reject(error)
        })
    })
  }

  async execute (file: Express.Multer.File) {
    const categories = await this.loadCategories(file)
    console.log(categories)
  }
}
