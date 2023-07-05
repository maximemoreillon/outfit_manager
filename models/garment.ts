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
  quantity: { type: Number, default: 1 },
  registration_date: { type: Date, default: Date.now() },
  rating: Number,
  condition: { type: Number, default: 100 },
})

export default model("Garment", schema)
