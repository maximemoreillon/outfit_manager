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
  read_garment_brands,
  read_garment_colors,
} from "../controllers/garments"
import {
  read_outfits_of_garment
} from '../controllers/outfits'
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
router.route("/brands").get(read_garment_brands)
router.route("/colors").get(read_garment_colors)


router
  .route("/:_id")
  .get(read_garment)
  .patch(update_garment)
  .delete(delete_garment)

  
router
.route("/:_id/outfits")
.get(read_outfits_of_garment)

router
  .route("/:_id/image")
  .post(upload.single("image"), upload_garment_image)
  .get(read_garment_image)

router.route("/:_id/thumbnail").get(read_garment_thumbnail)

export default router
