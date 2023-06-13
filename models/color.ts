import { Schema, model } from 'mongoose'


 const schema = new Schema({
   user_id: String,
   name: String,
   hex: String,
 })

 export default model('Color', schema)


