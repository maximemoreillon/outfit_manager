const Garment = require('../models/garment.js')
const path = require('path')
const {uploads_directory} = require('../config.js')
const {
  error_handling,
  create_image_thumbnail,
  get_thumbnail_filename,
} = require('../utils.js')




exports.read_all_garments = async (req,res) => {
  try {
    const user_id = res.locals.user._id
    const garments = await Garment.find({user_id})
    res.send(garments)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.read_garment = async (req,res) => {
  try {
    const _id = req.params.garment_id
    const garment = await Garment.findOne({_id})
    res.send(garment)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.create_garment = async (req,res) => {
  try {
    const user_id = res.locals.user._id
    const image = req.file.originalname
    await create_image_thumbnail(req)
    const new_garment = new Garment({...req.body, image, user_id})
    const saved_garment = await new_garment.save()
    res.send(saved_garment)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.update_garment = async (req,res) => {
  try {
    const _id = req.params.garment_id
    const properties = req.body
    const result = await Garment.findOneAndUpdate({_id}, properties)
    console.log(`Garment ${_id} updated`);
    res.send(result)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.delete_garment = async (req,res) => {
  try {
    const _id = req.params.garment_id
    const result = await Garment.findOneAndDelete({_id})
    res.send(result)
    console.log(`Outfit ${_id} deleted`)
  } catch (error) {
    error_handling(error,res)
  }
}

exports.upload_garment_image = async (req,res) => {
  try {
    const _id = req.params.garment_id
    const image = req.file.originalname
    await create_image_thumbnail(req)
    const result = await Garment.findOneAndUpdate({_id}, {image})
    res.send(result)
    console.log(`Image of garment ${_id} uploaded`)
  } catch (error) {
    error_handling(error,res)
  }

}

exports.read_garment_image = async (req,res) => {
  const _id = req.params.garment_id
  const {image} = await Garment.findOne({_id})
  const image_absolute_path = path.join(__dirname, `../${uploads_directory}`,'garments', image)
  res.sendFile(image_absolute_path)
}

exports.read_garment_thumbnail = async (req,res) => {
  try {
    const _id = req.params.garment_id
    const {image} = await Garment.findOne({_id})
    const thumbnail_filename = get_thumbnail_filename(image)
    const image_absolute_path = path.join(__dirname, `../${uploads_directory}`,'garments', thumbnail_filename)
    res.sendFile(image_absolute_path)
  } catch (error) {
    error_handling(error,res)
  }
}
