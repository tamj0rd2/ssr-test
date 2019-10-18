import { ErrorRequestHandler, RequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.headersSent ? next(err) : res.status(500).send('Something broke :(')
}

export const notFoundHandler: RequestHandler = (req, res, next) => {
  return res.status(404).send('Could not find the URL :(')
}
