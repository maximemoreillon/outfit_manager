const { Schema, model } = require('mongoose')


 const garmentSchema = new Schema({
   user_id: String,
   image: String,
   label: String,
   color: String,
   brand: String,
   description: String,
 })

 const Garment = model('Garment', garmentSchema)

 module.exports = Garment
