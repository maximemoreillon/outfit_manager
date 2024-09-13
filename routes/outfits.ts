import { Router } from "express"
import {
  create_outfit,
  read_outfits,
  read_outfit,
  update_outfit,
  delete_outfit,
  upload_outfit_image,
  read_outfit_image,
  read_outfit_thumbnail,
} from "../controllers/outfits"

import multer from "multer"
import { uploads_directory } from "../config"
import { authMiddleware } from "../auth"

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${uploads_directory}/outfits`)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

// Unprotected routes
router.route("/:_id/image").get(read_outfit_image)
router.route("/:_id/thumbnail").get(read_outfit_thumbnail)

// Protected routes
router.use(authMiddleware)

router.route("/").get(read_outfits).post(upload.single("image"), create_outfit)

router
  .route("/:_id")
  .get(read_outfit)
  .patch(update_outfit)
  .delete(delete_outfit)

router.route("/:_id/image").post(upload.single("image"), upload_outfit_image)

export default router
