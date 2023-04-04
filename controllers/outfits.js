const Outfit = require("../models/outfit.js")
const path = require("path")
const { uploads_directory } = require("../config.js")
const {
  create_image_thumbnail,
  get_thumbnail_filename,
} = require("../utils.js")

exports.real_all_outfits = async (req, res) => {
  const user_id = res.locals.user._id
  const query = user_id ? { user_id } : {}
  const outfits = await Outfit.find(query)
  res.send(outfits)
}

exports.read_outfit = async (req, res) => {
  const { outfit_id: _id } = req.params
  const outfit = await Outfit.findOne({ _id }).populate("garments")
  res.send(outfit)
}

exports.create_outfit = async (req, res) => {
  const user_id = res.locals.user._id
  const image = req.file.originalname
  await create_image_thumbnail(req)
  const new_outfit = new Outfit({ image, user_id })
  const saved_outfit = await new_outfit.save()
  res.send(saved_outfit)
}

exports.update_outfit = async (req, res) => {
  const { outfit_id: _id } = req.params
  const properties = req.body
  const result = await Outfit.findOneAndUpdate({ _id }, properties)
  res.send(result)
}

exports.delete_outfit = async (req, res) => {
  const { outfit_id: _id } = req.params
  const result = await Outfit.findOneAndDelete({ _id })
  res.send(result)
  console.log(`Outfit ${_id} deleted`)
}

exports.upload_outfit_image = async (req, res) => {
  const { originalname: image } = req.file
  const { outfit_id: _id } = req.params
  await create_image_thumbnail(req)
  const result = await Outfit.findOneAndUpdate({ _id }, { image })
  res.send(result)
  console.log(`Updated image of outfit ${_id}`)
}

exports.read_outfit_image = async (req, res) => {
  const { outfit_id: _id } = req.params
  const { image } = await Outfit.findOne({ _id })
  const image_absolute_path = path.join(uploads_directory, "outfits", image)
  res.sendFile(image_absolute_path)
}

exports.read_outfit_thumbnail = async (req, res) => {
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
