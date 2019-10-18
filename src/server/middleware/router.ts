import { Router } from 'express'
import MarkupThingy from '../markup-thingy'

const createRouter = (markupThingy: MarkupThingy): Router => {
  const router = Router()

  router.get('^/$', (req, res, next) => {
    let markup: string

    try {
      markup = markupThingy.createAppMarkup({ greeting: 'Yo!' })
    } catch (err) {
      return next(err)
    }

    return res.status(200).send(markup)
  })

  router.get('^/500$', () => {
    throw new Error('Simulating an internal server error')
  })

  return router
}

export default createRouter
