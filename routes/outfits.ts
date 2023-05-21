import {Router} from 'express'
import {
  create_outfit,
  real_all_outfits,
  read_outfit,
  update_outfit,
  delete_outfit,
  upload_outfit_image,
  read_outfit_image,
  read_outfit_thumbnail
} from '../controllers/outfits'
import multer  from 'multer'
import {uploads_directory} from '../config'

const router = Router()

const storage = multer.diskStorage({
  destination:  (req, file, cb) => { cb(null, `${uploads_directory}/outfits`) },
  filename:  (req, file, cb) => { cb(null, file.originalname) }
})

const upload = multer({ storage })


router.route('/')
  .get(real_all_outfits)
  .post(upload.single('image'), create_outfit)

router.route('/:outfit_id')
  .get(read_outfit)
  .patch(update_outfit)
  .delete(delete_outfit)


router.route('/:outfit_id/image')
  .post(upload.single('image'), upload_outfit_image)
  .get(read_outfit_image)

router.route('/:outfit_id/thumbnail')
  .get(read_outfit_thumbnail)

export default router