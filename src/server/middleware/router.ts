import { Router } from 'express'
import AppMarkup from '../app-markup'

const createRouter = (markupThingy: AppMarkup): Router => {
  const router = Router()

  router.get('^/$', async (req, res, next) => {
    let markup: string

    try {
      markup = await markupThingy.createHtml({ greeting: 'Yo!' }, res.locals.loadableStats)
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
