import Garment from "../models/garment"
import path from "path"
import { uploads_directory } from "../config"
import { create_image_thumbnail, get_thumbnail_filename } from "../utils"
import { Request, Response } from "express"
import createHttpError from "http-errors"

export const read_garments = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const { ...filters } = req.query

  const query = {
    ...filters,
  }

  if (user_id) query["user_id"] = user_id

  // TODO: pagination
  const garments = await Garment.find(query)
  res.send(garments)
}

export const read_garment = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const garment = await Garment.findOne({ _id })
  res.send(garment)
}

export const create_garment = async (req: Request, res: Response) => {
  const { file } = req
  if (!file) throw createHttpError(400, "File not provided")
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
  const options = { new: true }
  const updatedGarment = await Garment.findOneAndUpdate(
    { _id },
    properties,
    options
  )
  if (!updatedGarment) throw createHttpError(404, "Garment not found")
  console.log(`Garment ${_id} updated`)
  res.send(updatedGarment)
}

export const delete_garment = async (req: Request, res: Response) => {
  const _id = req.params.garment_id
  const deletedGarment = await Garment.findOneAndDelete({ _id })
  if (!deletedGarment) throw createHttpError(404, "Garment not found")
  console.log(`Garment ${_id} deleted`)
  res.send(deletedGarment)
}

export const upload_garment_image = async (req: Request, res: Response) => {
  const { file, params } = req
  if (!file) throw createHttpError(400, "File not provided")
  const _id = params.garment_id
  const image = file.originalname
  await create_image_thumbnail(req)
  const options = { new: true }
  const updatedGarment = await Garment.findOneAndUpdate(
    { _id },
    { image },
    options
  )
  if (!updatedGarment) throw createHttpError(404, "Garment not found")

  console.log(`Image of garment ${_id} uploaded`)
  res.send(updatedGarment)
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

// TODO: combine those
export const read_garment_types = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const query: any = {}
  if (user_id) query["user_id"] = user_id
  const garment = await Garment.distinct("type", query)
  res.send(garment)
}

export const read_garment_brands = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const query: any = {}
  if (user_id) query["user_id"] = user_id
  const garment = await Garment.distinct("brand", query)
  res.send(garment)
}

export const read_garment_colors = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const query: any = {}
  if (user_id) query["user_id"] = user_id
  const garment = await Garment.distinct("color", query)
  res.send(garment)
}
