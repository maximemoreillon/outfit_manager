const { Schema, model } = require('mongoose')


 const garmentSchema = new Schema({
   user_id: String,
   label: String,
   image: String,
   color: String,
 })

 const Garment = model('Garment', garmentSchema)

 module.exports = Garment
