import path from 'path'
import sharp from 'sharp'
import { Request } from 'express'

export const get_thumbnail_filename = (original_filename: string) => {
  return original_filename.replace(/(\.[\w\d_-]+)$/i, '_thumbnail$1')
}

export const create_image_thumbnail = async (req: Request) => {

  const {file} = req
  if(!file) throw 'File not provided'
  
  const thumbnail_filename = get_thumbnail_filename(file.originalname)
  const thumbnail_path = path.resolve(file.destination,thumbnail_filename)

  await sharp(file.path, { failOnError: true })
    .resize({ width: 320, fit: sharp.fit.contain, })
    .withMetadata()
    .toFile(thumbnail_path)

  console.log(`Created thumbnail for image ${file.originalname}`)
}
