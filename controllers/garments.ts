import Garment from "../models/garment"
import path from "path"
import { uploads_directory } from "../config"
import {
  create_image_thumbnail,
  get_thumbnail_filename,
} from "../utils"
import { Request, Response } from "express"
import createHttpError from 'http-errors'

export const read_all_garments = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const query = user_id ? { user_id } : {}
  const garments = await Garment.find(query)
  res.send(garments)
}

export const read_garment = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const garment = await Garment.findOne({ _id })
  res.send(garment)
}

export const create_garment = async (req: Request, res: Response) => {
  const {file} = req
  if(!file) throw createHttpError(400, 'File not provided')
  const user_id = res.locals.user._id
  const image = file.originalname
  await create_image_thumbnail(req)
  const new_garment = new Garment({ ...req.body, image, user_id })
  const saved_garment = await new_garment.save()
  res.send(saved_garment)
}

export const update_garment = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const properties = req.body
  const result = await Garment.findOneAndUpdate({ _id }, properties)
  console.log(`Garment ${_id} updated`)
  res.send(result)
}

export const delete_garment = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const result = await Garment.findOneAndDelete({ _id })
  res.send(result)
  console.log(`Outfit ${_id} deleted`)
}

export const upload_garment_image = async (req: Request, res: Response) => {
  const {file, params} = req
  if(!file) throw createHttpError(400, 'File not provided')
  const _id = params.garment_id
  const image = file.originalname
  await create_image_thumbnail(req)
  const result = await Garment.findOneAndUpdate({ _id }, { image })
  res.send(result)
  console.log(`Image of garment ${_id} uploaded`)
}

export const read_garment_image = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const { image } = await Garment.findOne({ _id })
  const image_absolute_path = path.join(uploads_directory, "garments", image)
  res.sendFile(image_absolute_path)
}

export const read_garment_thumbnail = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const { image } = await Garment.findOne({ _id })
  const thumbnail_filename = get_thumbnail_filename(image)
  const image_absolute_path = path.join(
    uploads_directory,
    "garments",
    thumbnail_filename
  )
  res.sendFile(image_absolute_path)
}
