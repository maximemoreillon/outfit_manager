import { Schema, model } from "mongoose"

const schema = new Schema({
  user_id: String,
  label: String, // A.k.a "name"
  description: String,
  image: String,
  color: String,
  brand: String,
  comment: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  type: String, // Temporary test
  size: String,
  quantity: Number,
})

export default model("Garment", schema)
