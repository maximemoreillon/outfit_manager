import { Schema, model } from "mongoose"

const schema = new Schema({
  user_id: String,
  label: String, // A.k.a "name" or "short description"
  description: String,

  image: String, // Would be nice to have multiple images
  color: String,
  brand: String,
  comment: String,
  type: String, // Would need to support multiple types, or categories
  size: String,
  quantity: { type: Number, default: 1 },
  registration_date: { type: Date, default: Date.now() },
  rating: Number,
  condition: { type: Number, default: 100 }, // Percentage

  // Currently unused
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
})

export default model("Garment", schema)
