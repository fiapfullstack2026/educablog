import mongoose from 'mongoose'

export async function connectDatabase(uri: string) {
  mongoose.set('strictQuery', false)

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  await mongoose.connect(uri)
  console.log('Banco de dados conectado')
  return mongoose
}
