import { Schema, model } from 'mongoose'


 const garmentSchema = new Schema({
   user_id: String,
   image: String,
   label: String,
   color: String,
   brand: String,
   description: String,
   comment: String,
 })

 const Garment = model('Garment', garmentSchema)

 export default Garment
