import path from 'path'
import express from 'express'
import renderer from './renderer'

export default function createRouter() {
    const router = express.Router()

    router.use('^/$', renderer)

    router.use('/api/hello', (req, res) => {
        return res.status(200).send('Hello, from your API!')
    })

    router.use(
        '/public',
        express.static('.' + path.resolve(__dirname, '../..', 'dist'), { maxAge: '30d' })
    )

    return router
}
