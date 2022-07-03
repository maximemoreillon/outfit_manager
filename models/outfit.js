const { Schema, model } = require('mongoose')

 const outfitSchema = new Schema({
   user_id: String,
   label: String,
   image: String,
   garments: [{ type: Schema.Types.ObjectId, ref: 'Garment' }]

 })

 const Outfit = model('Outfit', outfitSchema)

 module.exports = Outfit
