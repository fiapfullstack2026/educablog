import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  professor: { type: String, required: true },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
})
