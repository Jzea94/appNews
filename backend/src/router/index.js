import fs from 'fs'
import { resolve, extname } from 'path'
import { Router } from 'express'


const router = Router()

const PATH_DIR = resolve('src','router')
let files = fs.readdirSync(PATH_DIR, 'utf8')

/**
 * 
 * @param {String} file Nombre del archivo
 * @returns Nombre del archivo sin extensión
 */
const removeExt = ( file ) => {
  return file.replace(extname(file), '')
}

for (const file of files) {
  const name = removeExt(file)
  try {
    if ( name !== 'index') {
      const module = await import(`./${file}`)
      const routeHandler = module.router || module.default || module
      router.use(`/${name}`, routeHandler)
    }
    
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export { router }