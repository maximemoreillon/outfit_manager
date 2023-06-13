import { Schema, model } from 'mongoose'

// NOTE: might not useful like that because MongoDB can query distincts

 const schema = new Schema({
   user_id: String,
   label: String,
 })

 export default model('Tag', schema)

