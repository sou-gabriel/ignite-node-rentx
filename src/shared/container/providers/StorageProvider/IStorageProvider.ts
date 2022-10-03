export interface IStorageProvider {
  save(folder: string, file: string): Promise<void>
  delete(folder: string, file: string): Promise<void>
}
