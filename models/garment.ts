import { Schema, model } from "mongoose"

const schema = new Schema({
  user_id: String,
  image: String,
  color: String,
  brand: String,
  description: String,
  comment: String,
  label: String, // What is this for?
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  type: String, // Temporary test
})

export default model("Garment", schema)
