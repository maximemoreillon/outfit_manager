import Outfit from "../models/outfit"
import path from "path"
import createHttpError from "http-errors"
import { uploads_directory } from "../config"
import { create_image_thumbnail, get_thumbnail_filename } from "../utils"
import { Request, Response } from "express"

export const create_outfit = async (req: Request, res: Response) => {
  const { file } = req
  if (!file) throw createHttpError(400, "File not provided")
  const user_id = res.locals.user._id
  const image = file.originalname
  await create_image_thumbnail(req)
  const new_outfit = new Outfit({ image, user_id })
  const saved_outfit = await new_outfit.save()
  res.send(saved_outfit)
}

export const real_outfits = async (req: Request, res: Response) => {
  const user_id = res.locals.user._id
  const query = user_id ? { user_id } : {}
  const outfits = await Outfit.find(query)
  res.send(outfits)
}

export const read_outfit = async (req: Request, res: Response) => {
  const { _id } = req.params
  const outfit = await Outfit.findOne({ _id }).populate("garments")
  res.send(outfit)
}

export const update_outfit = async (req: Request, res: Response) => {
  const { _id } = req.params
  const properties = req.body
  const options = { new: true }
  const updatedOutfit = await Outfit.findOneAndUpdate(
    { _id },
    properties,
    options
  )
  if (!updatedOutfit) throw createHttpError(404, "Deleted not found")
  res.send(updatedOutfit)
}

export const delete_outfit = async (req: Request, res: Response) => {
  const { _id } = req.params
  const deletedOutfit = await Outfit.findOneAndDelete({ _id })
  if (!deletedOutfit) throw createHttpError(404, "Outfit not found")
  console.log(`Outfit ${_id} deleted`)
  res.send(deletedOutfit)
}

export const upload_outfit_image = async (req: Request, res: Response) => {
  // Is this even used?
  const { file, params } = req
  if (!file) throw createHttpError(400, "File not provided")
  const { originalname: image } = file
  const { _id } = params
  await create_image_thumbnail(req)
  const options = { new: true }

  const updatedOutfit = await Outfit.findOneAndUpdate(
    { _id },
    { image },
    options
  )
  if (!updatedOutfit) throw createHttpError(404, "Outfit not found")

  console.log(`Updated image of outfit ${_id}`)
  res.send(updatedOutfit)
}

export const read_outfit_image = async (req: Request, res: Response) => {
  const { _id } = req.params
  const outfit = await Outfit.findOne({ _id })
  if (!outfit) throw createHttpError(404, "Outfit not found")
  const image_absolute_path = path.join(
    uploads_directory,
    "outfits",
    outfit.image
  )
  res.sendFile(image_absolute_path)
}

export const read_outfit_thumbnail = async (req: Request, res: Response) => {
  const { _id } = req.params
  const outfit = await Outfit.findOne({ _id })
  if (!outfit) throw createHttpError(404, "Outfit not found")
  const thumbnail_filename = get_thumbnail_filename(outfit.image)
  const image_absolute_path = path.join(
    uploads_directory,
    "outfits",
    thumbnail_filename
  )
  res.sendFile(image_absolute_path)
}

export const read_outfits_of_garment = async (req: Request, res: Response) => {
  const { _id: garment_id } = req.params
  const user_id = res.locals.user._id
  const query: any = {
    garments: garment_id
  }
  if(user_id) query.user_id = user_id
  const outfits = await Outfit.find(query)
  res.send(outfits)
  
}