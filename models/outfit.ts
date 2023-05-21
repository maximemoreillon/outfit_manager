import { Schema, model } from 'mongoose'

 const outfitSchema = new Schema({
   user_id: String,
   label: String,
   image: String,
   garments: [{ type: Schema.Types.ObjectId, ref: 'Garment' }]

 })

 const Outfit = model('Outfit', outfitSchema)

 export default Outfit
