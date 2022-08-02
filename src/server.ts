import express from 'express'

import { categoriesRoutes } from './routes/categories.routes'
import { specificationsRouter } from './routes/specifications.routes'

const app = express()

app.use(express.json())
app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationsRouter)

app.listen(3333, () => {
  console.log('Server is running! 🏃')
})
