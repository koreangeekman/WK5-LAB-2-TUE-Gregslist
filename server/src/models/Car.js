import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema({
  make: { type: String, required: true, maxLength: 20 },
  model: { type: String, required: true, maxLength: 50 },
  price: { type: Number, required: true, min: 0, max: 10000000 },
  year: { type: Number, required: true, min: 1800, max: new Date().getUTCFullYear() },
  color: { type: String, required: true, minLength: 4, maxLength: 7, default: '#000000' },
  imgUrl: { type: String, required: true, minLength: 16, maxLength: 200 },
  mileage: { type: Number, required: false, min: 0, max: 500000 },
  description: { type: String, required: false, maxLength: 300 },
  runs: { type: Boolean, required: true, default: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

// add validator for color code to error on 5,6 char length