import Outfit from "../models/outfit"
import path from "path"
import { uploads_directory } from "../config"
import {
  create_image_thumbnail,
  get_thumbnail_filename,
} from "../utils"
import { Request, Response } from 'express'
import createHttpError from 'http-errors'

export const real_all_outfits = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const query = user_id ? { user_id } : {}
  const outfits = await Outfit.find(query)
  res.send(outfits)
}

export const read_outfit = async (req: Request, res: Response) => {
  const { outfit_id: _id } = req.params
  const outfit = await Outfit.findOne({ _id }).populate("garments")
  res.send(outfit)
}

export const create_outfit = async (req: Request, res: Response) => {
  const {file} = req
  if(!file) throw createHttpError(400, 'File not provided')
  const user_id = res.locals.user._id
  const image = file.originalname
  await create_image_thumbnail(req)
  const new_outfit = new Outfit({ image, user_id })
  const saved_outfit = await new_outfit.save()
  res.send(saved_outfit)
}

export const update_outfit = async (req: Request, res: Response) => {
  const { outfit_id: _id } = req.params
  const properties = req.body
  const result = await Outfit.findOneAndUpdate({ _id }, properties)
  res.send(result)
}

export const delete_outfit = async (req: Request, res: Response) => {
  const { outfit_id: _id } = req.params
  const result = await Outfit.findOneAndDelete({ _id })
  res.send(result)
  console.log(`Outfit ${_id} deleted`)
}

export const upload_outfit_image = async (req: Request, res: Response) => {
  const {file, params} = req
  if(!file) throw createHttpError(400, 'File not provided')
  const { originalname: image } = file
  const { outfit_id: _id } = params
  await create_image_thumbnail(req)
  const result = await Outfit.findOneAndUpdate({ _id }, { image })
  res.send(result)
  console.log(`Updated image of outfit ${_id}`)
}

export const read_outfit_image = async (req: Request, res: Response) => {
  const { outfit_id: _id } = req.params
  const { image } = await Outfit.findOne({ _id })
  const image_absolute_path = path.join(uploads_directory, "outfits", image)
  res.sendFile(image_absolute_path)
}

export const read_outfit_thumbnail = async (req: Request, res: Response) => {
  const { outfit_id: _id } = req.params
  const { image } = await Outfit.findOne({ _id })
  const thumbnail_filename = get_thumbnail_filename(image)
  const image_absolute_path = path.join(
    uploads_directory,
    "outfits",
    thumbnail_filename
  )
  res.sendFile(image_absolute_path)
}