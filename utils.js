const path = require('path')
const sharp = require('sharp')


const get_thumbnail_filename = (original_filename) => {
  return original_filename.replace(/(\.[\w\d_-]+)$/i, '_thumbnail$1')
}

const create_image_thumbnail = async (req) => {

  const thumbnail_filename = get_thumbnail_filename(req.file.originalname)
  const thumbnail_path = path.resolve(req.file.destination,thumbnail_filename)

  await sharp(req.file.path, { failOnError: true })
    .resize({ width: 320, fit: sharp.fit.contain, })
    .withMetadata()
    .toFile(thumbnail_path)

  console.log(`Created thumbnail for image ${req.file.originalname}`)
}


exports.create_image_thumbnail = create_image_thumbnail
exports.get_thumbnail_filename = get_thumbnail_filename
