const {Router} = require('express')
const controller = require('../controllers/garments.js')
const multer  = require('multer')
const path = require('path')
const {uploads_directory} = require('../config.js')

const router = Router()

const storage = multer.diskStorage({
  destination:  (req, file, cb) => { cb(null, `${uploads_directory}/garments`) },
  filename:  (req, file, cb) => { cb(null, file.originalname) }
})


const upload = multer({ storage })

router.route('/')
  .get(controller.read_all_garments)
  .post(upload.single('image'), controller.create_garment)

router.route('/:garment_id')
  .get(controller.read_garment)
  .patch(controller.update_garment)

router.route('/:garment_id/image')
  .post(upload.single('image'), controller.upload_garment_image)
  .get(controller.read_garment_image)

router.route('/:garment_id/thumbnail')
  .get(controller.read_garment_thumbnail)

module.exports = router
