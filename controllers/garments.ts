import Garment from "../models/garment"
import path from "path"
import { uploads_directory } from "../config"
import { create_image_thumbnail, get_thumbnail_filename } from "../utils"
import { Request, Response } from "express"
import createHttpError from "http-errors"
import { getUserId } from "../auth"

export const create_garment = async (req: Request, res: Response) => {
  const { file, body } = req
  const user_id = getUserId(req, res)
  const newGarmentProperties = { ...body, user_id }

  if (file) {
    await create_image_thumbnail(req)
    newGarmentProperties.image = file.originalname
  }

  const newGarment = await Garment.create(newGarmentProperties)
  res.send(newGarment)
}

export const read_garments = async (req: Request, res: Response) => {
  const user_id = getUserId(req, res)

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
  const { _id } = req.params
  const garment = await Garment.findOne({ _id })
  if (!garment) throw createHttpError(404, "Garment not found")
  res.send(garment)
}

export const update_garment = async (req: Request, res: Response) => {
  const { _id } = req.params
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
  const { _id } = req.params
  const deletedGarment = await Garment.findOneAndDelete({ _id })
  if (!deletedGarment) throw createHttpError(404, "Garment not found")
  console.log(`Garment ${_id} deleted`)
  res.send(deletedGarment)
}

export const upload_garment_image = async (req: Request, res: Response) => {
  const { file, params } = req
  if (!file) throw createHttpError(400, "File not provided")
  const { _id } = params
  const image = file.originalname
  await create_image_thumbnail(req)
  const options = { new: true }
  const updatedGarment = await Garment.findOneAndUpdate(
    { _id },
    { image },
    options
  )
  if (!updatedGarment) throw createHttpError(404, "Garment not found")

  res.send(updatedGarment)
}

export const read_garment_image = async (req: Request, res: Response) => {
  const { _id } = req.params
  const garment = await Garment.findOne({ _id })
  if (!garment) throw createHttpError(404, "Garment not found")
  if (!garment.image)
    throw createHttpError(404, "Garment does not have an image")

  const image_absolute_path = path.join(
    uploads_directory,
    "garments",
    garment.image
  )
  res.sendFile(image_absolute_path)
}

export const read_garment_thumbnail = async (req: Request, res: Response) => {
  const { _id } = req.params
  const garment = await Garment.findOne({ _id })
  if (!garment) throw createHttpError(404, "Garment not found")
  if (!garment.image)
    throw createHttpError(404, "Garment does not have an image")
  const thumbnail_filename = get_thumbnail_filename(garment.image)
  const image_absolute_path = path.join(
    uploads_directory,
    "garments",
    thumbnail_filename
  )
  res.sendFile(image_absolute_path)
}

// TODO: combine those
export const read_garment_types = async (req: Request, res: Response) => {
  const user_id = getUserId(req, res)
  const query: any = {}
  if (user_id) query["user_id"] = user_id
  const garment = await Garment.distinct("type", query)
  res.send(garment)
}

export const read_garment_brands = async (req: Request, res: Response) => {
  const user_id = getUserId(req, res)
  const query: any = {}
  if (user_id) query["user_id"] = user_id
  const garment = await Garment.distinct("brand", query)
  res.send(garment)
}

export const read_garment_colors = async (req: Request, res: Response) => {
  const user_id = getUserId(req, res)
  const query: any = {}
  if (user_id) query["user_id"] = user_id
  const garment = await Garment.distinct("color", query)
  res.send(garment)
}
