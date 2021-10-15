const {Router} = require('express')
const controller = require('../controllers/outfits.js')
const multer  = require('multer')
const path = require('path')
const {uploads_directory} = require('../config.js')

const router = Router()

const storage = multer.diskStorage({
  destination:  (req, file, cb) => { cb(null, `${uploads_directory}/outfits`) },
  filename:  (req, file, cb) => { cb(null, file.originalname) }
})

const upload = multer({ storage })


router.route('/')
  .get(controller.real_all_outfits)
  .post(upload.single('image'), controller.create_outfit)

router.route('/:outfit_id')
  .get(controller.read_outfit)
  .patch(controller.update_outfit)
  .delete(controller.delete_outfit)


router.route('/:outfit_id/image')
  .post(upload.single('image'), controller.upload_outfit_image)
  .get(controller.read_outfit_image)

router.route('/:outfit_id/thumbnail')
  .get(controller.read_outfit_thumbnail)

module.exports = router
