import { app } from './app'
import { connectDatabase } from './lib/mongoose'

const port = process.env.PORT ?? 3000
const mongoUri =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/educablog'

async function startServer() {
  await connectDatabase(mongoUri)

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(
      `Documentação da API disponível em http://localhost:${port}/docs`,
    )
  })
}

startServer().catch((error) => {
  console.error('Falha ao iniciar o servidor', error)
  process.exit(1)
})
