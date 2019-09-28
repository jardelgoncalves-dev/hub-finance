import User from '../../../src/models/User'

describe('Routes Session', () => {

  const userDefault = {
    name: 'User Test',
    email: 'user@example.com',
    password: '123'
  }

  beforeEach(done => {
    User.query().truncate()
      .then(() => {
        User.query().insert(userDefault)
          .then(() => {
            done()
          })
      })
  })
  describe('Route POST /session', () => {
    it('should return an error when no required data is sent', done => {
      request
        .post('/session')
        .send({ password: '123' })
        .end((err, res) => {
          expect(res.body.error.email).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })
    it('should return an error when data is invalid', done => {
      request
        .post('/session')
        .send({ email: 'jardel@email', password: '123' })
        .end((err, res) => {
          expect(res.body.error.email).to.be.a('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should return an error if the data does not match the registered data', done => {
      request
        .post('/session')
        .send({ email: 'user@example.com', password: '123567' }) // password inválid
        .end((err, res) => {
          expect(res.body.error.message).to.be.a('string')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should return a token', done => {
      request
        .post('/session')
        .send({ email: 'user@example.com', password: '123' })
        .end((err, res) => {
          expect(res.body.token).to.be.a('string')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })
  })
})