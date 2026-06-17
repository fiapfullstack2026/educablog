import { app } from './app'
import { connectDatabase } from './lib/mongoose'

const port = process.env.PORT ?? 3000
const mongoUri =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/educablog'

async function startServer() {
  await connectDatabase(mongoUri)

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
