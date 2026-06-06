import mongoose from 'mongoose'

export async function connectDatabase(uri: string) {
  mongoose.set('strictQuery', false)

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  console.log('Connected to database')
  return mongoose.connect(uri)
}
