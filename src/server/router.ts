import express from 'express'
import renderComponent from './internals/renderer'
import Thing from '../client/Thing'

export default function createRouter() {
  const router = express.Router()

  router.use(
    '^/$',
    renderComponent(Thing, async () => {
      return {
        message: 'Hello :)',
      }
    }),
  )

  return router
}
