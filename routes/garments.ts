import { Router } from "express"
import {
  create_garment,
  read_garments,
  read_garment,
  read_garment_image,
  read_garment_thumbnail,
  update_garment,
  upload_garment_image,
  delete_garment,
  read_garment_types,
} from "../controllers/garments"
import multer from "multer"
import { uploads_directory } from "../config"

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${uploads_directory}/garments`)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router
  .route("/")
  .get(read_garments)
  .post(upload.single("image"), create_garment)

router.route("/types").get(read_garment_types)

router
  .route("/:garment_id")
  .get(read_garment)
  .patch(update_garment)
  .delete(delete_garment)

router
  .route("/:garment_id/image")
  .post(upload.single("image"), upload_garment_image)
  .get(read_garment_image)

router.route("/:garment_id/thumbnail").get(read_garment_thumbnail)

export default router
