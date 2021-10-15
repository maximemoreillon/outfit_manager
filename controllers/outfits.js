const Outfit = require('../models/outfit.js')
const path = require('path')
const {uploads_directory} = require('../config.js')
const {
  error_handling,
  create_image_thumbnail,
  get_thumbnail_filename,
} = require('../utils.js')

exports.real_all_outfits = async (req,res) => {
  const outfits = await Outfit.find({})
  res.send(outfits)
}

exports.create_outfit = async (req,res) => {
  try {
    const image = req.file.originalname
    await create_image_thumbnail(req)
    const new_outfit = new Outfit({image})
    const saved_outfit = await new_outfit.save()
    res.send(saved_outfit)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.read_outfit = async (req,res) => {
  try {
    const {outfit_id: _id} = req.params
    const outfit = await Outfit.findOne({_id})
    res.send(outfit)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.update_outfit = async (req,res) => {
  try {
    const {outfit_id: _id} = req.params
    const properties = req.body
    const result = await Outfit.findOneAndUpdate({_id}, properties)
    res.send(result)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.upload_outfit_image = async (req,res) => {
  try {
    const {originalname: image} = req.file
    const {outfit_id: _id} = req.params
    await create_image_thumbnail(req)
    const result = await Outfit.findOneAndUpdate({_id}, {image})
    res.send(result)
    console.log(`Updated image of outfit ${_id}`)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.read_outfit_image = async (req,res) => {
  const {outfit_id: _id} = req.params
  const {image} = await Outfit.findOne({_id})
  const image_absolute_path = path.join(__dirname, `../${uploads_directory}`,'outfits',image)
  res.sendFile(image_absolute_path)
}

exports.read_outfit_thumbnail = async (req,res) => {
  try {
    const {outfit_id: _id} = req.params
    const {image} = await Outfit.findOne({_id})
    const thumbnail_filename = get_thumbnail_filename(image)
    const image_absolute_path = path.join(__dirname, `../${uploads_directory}`, 'outfits', thumbnail_filename)
    res.sendFile(image_absolute_path)
  } catch (error) {
    error_handling(error,res)
  }
}
