import { Schema, model } from 'mongoose'

 const schema = new Schema({
   user_id: String,
   label: String, // What is this for?
   image: String,
   garments: [{ type: Schema.Types.ObjectId, ref: 'Garment' }]

 })

 export default model('Outfit', schema)

 
