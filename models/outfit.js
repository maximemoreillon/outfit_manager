const { Schema, model } = require('mongoose')

 const outfitSchema = new Schema({
   user_id: String,
   label: String,
   image: String,
   garments: [String]

 })

 const Outfit = model('Outfit', outfitSchema)

 module.exports = Outfit
