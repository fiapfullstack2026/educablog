import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  teacher: { type: String, required: true },
  discipline: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
})
