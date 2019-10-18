import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    console.error(err.stack)
    res.status(500).send('Something broke :(')
  }
}

export default errorHandler
