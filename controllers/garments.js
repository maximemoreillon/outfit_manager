const Garment = require('../models/garment.js')
const path = require('path')
const {uploads_directory} = require('../config.js')
const {
  error_handling,
  create_image_thumbnail,
  get_thumbnail_filename,
} = require('../utils.js')

exports.read_all_garments = async (req,res) => {
  const garments = await Garment.find({})
  res.send(garments)
}

exports.read_garment = async (req,res) => {
  const {garment_id: _id} = req.params
  const garment = await Garment.findOne({_id})
  res.send(garment)
}

exports.create_garment = async (req,res) => {
  try {
    const image = req.file.originalname
    const new_garment = new Garment({...req.body, image})
    const saved_garment = await new_garment.save()
    res.send(saved_garment)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.update_garment = async (req,res) => {
  try {
    const {garment_id: _id} = req.params
    const result = await Garment.findOneAndUpdate({_id}, req.body)
    res.send(result)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.delete_garment = async (req,res) => {
  try {
    const {garment_id: _id} = req.params
    const result = await Garment.findOneAndDelete({_id})
    res.send(result)
    console.log(`Outfit ${_id} deleted`)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.upload_garment_image = async (req,res) => {
  try {
    const {garment_id: _id} = req.params
    const {originalname: image} = req.file
    await create_image_thumbnail(req)
    const result = await Garment.findOneAndUpdate({_id}, {image})
    res.send(result)
    console.log(`Image of garment ${_id} uploaded`)
  } catch (error) {
    error_handling(error,res)
  }

}

exports.read_garment_image = async (req,res) => {
  const {garment_id: _id} = req.params
  const {image} = await Garment.findOne({_id})
  const image_absolute_path = path.join(__dirname, `../${uploads_directory}`,'garments', image)
  res.sendFile(image_absolute_path)
}

exports.read_garment_thumbnail = async (req,res) => {
  try {
    const {garment_id: _id} = req.params
    const {image} = await Garment.findOne({_id})
    const thumbnail_filename = get_thumbnail_filename(image)
    const image_absolute_path = path.join(__dirname, `../${uploads_directory}`,'garments', thumbnail_filename)
    res.sendFile(image_absolute_path)
  } catch (error) {
    error_handling(error,res)
  }
}
