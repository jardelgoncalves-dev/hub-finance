import { expect } from 'chai'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import app from '../../src/app'


global.app = app
global.request = supertest(app)
global.expect = expect
global.jwt = jwt
global.APP_SECRET = process.env.APP_SECRET