import { Schema } from "mongoose";

export const JobSchema = new Schema({
  company: { type: String, required: true, maxLength: 50 },
  jobTitle: { type: String, required: true, maxLength: 50 },
  hours: { type: Number, required: true, min: 1, max: 60 },
  rate: { type: Number, required: true, min: 10, },
  description: { type: String, required: true, maxLength: 300 },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
})

// this.id = data.id || generateId()
// this.company = data.company
// this.jobTitle = data.jobTitle
// this.rate = data.rate
// this.hours = data.hours
// this.description = data.description
// this.pay = data.pay
// this.imgUrl = data.imgUrl
// this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()
// this.updatedAt = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : new Date().toLocaleString()
// this.creatorId = data.creatorId
// this.creator = data.creator