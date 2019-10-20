import { ErrorRequestHandler, RequestHandler, Response, NextFunction } from 'express'
import AppMarkup from '../app-markup'

const createErrorHandlers = (markupThingy: AppMarkup) => {
  const handleError = async (res: Response, next: NextFunction, errorStatusCode: number) => {
    try {
      const markup = await markupThingy.createHtml({ errorStatusCode }, res.locals.loadableStats)
      res.status(errorStatusCode).send(markup)
    } catch (e) {
      next(e)
    }
  }

  const handleServerError: ErrorRequestHandler = async (err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }

    return handleError(res, next, 500)
  }

  const handle404Error: RequestHandler = async (_, res, next) => handleError(res, next, 404)

  return [handleServerError, handle404Error]
}

export default createErrorHandlers
