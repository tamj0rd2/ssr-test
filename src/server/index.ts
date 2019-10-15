import express from 'express'
import createRouter from './router'

const app = express()
const port = 3000

app.use(createRouter())

app.listen(port, () => console.log(`App listening on port ${port}`))
