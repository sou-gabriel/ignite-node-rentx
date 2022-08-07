import { parse } from 'csv-parse'
import fs from 'fs'

export class ImportCategoryUseCase {
  execute (file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path)

    const parseFile = parse()

    stream.pipe(parseFile) // Cada parte lida do arquivo, o pipe joga esse pedaço já lido para algum lugar especificado.

    parseFile.on('data', async line => {
      console.log(line)
    })
  }
}
