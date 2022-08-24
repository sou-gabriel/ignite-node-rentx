import fs from 'fs'

export const deleteFile = async (fileName: string) => {
  try {
    await fs.promises.stat(fileName) // Check if file exists
  } catch {
    return
  }

  await fs.promises.unlink(fileName) // Remove file
}
