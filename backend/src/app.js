import express from 'express'
import knex from 'knex'
import { Model } from 'objection'
import cors from 'cors'

import routes from './routes'
import knexConfig from '../knexfile'

const app = express()

// config models objection.js
const Knex = knex(knexConfig[process.env.NODE_ENV || 'development'])
Model.knex(Knex)

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use(routes)

export default app