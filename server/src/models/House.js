import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema({
  year: { type: Number, required: true, min: 1, max: new Date().getUTCFullYear() },
  price: { type: Number, required: true, min: 0, max: 100000000 },
  bedrooms: { type: Number, required: true, min: 0, max: 100 },
  bathrooms: { type: Number, required: true, min: 0, max: 100 },
  levels: { type: Number, required: true, min: 0, max: 100 },
  description: { type: String, required: false, maxLength: 300 },
  imgUrl: { type: String, required: true, minLength: 16, maxLength: 200 },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
},
  { timestamps: true, toJSON: { virtuals: true } }
)

// this.id = data.id || generateId()
// this.year = data.year
// this.levels = data.levels
// this.bedrooms = data.bedrooms
// this.bathrooms = data.bathrooms
// this.price = data.price
// this.description = data.description
// this.imgUrl = data.imgUrl
// this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()
// this.updatedAt = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : new Date().toLocaleString()
// this.creatorId = data.creatorId
// this.creator = data.creator