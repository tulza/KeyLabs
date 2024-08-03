import fs from 'fs'
import path from 'path'

export function getWords() {
  const filePath = path.join(process.cwd(), 'path/to/your/words.txt')
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  return fileContents.split('\n')
}
