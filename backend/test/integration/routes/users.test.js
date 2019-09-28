import User from '../../../src/models/User'

describe('Routes Users', () => {

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

  describe('Route POST /users', () => {
    it('should return an error when no required data is sent', done => {
      request
        .post('/users')
        .send({ email: 'jardel@example.com', password: '123' })
        .end((err, res) => {
          expect(res.body.error.name).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should return an error when data is invalid', done => {
      request
        .post('/users')
        .send({ name: 'Jardel', email: 'jardel@example', password: '123' })
        .end((err, res) => {
          expect(res.body.error.email).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should return an error when entering an email that has registration', done => {
      request
        .post('/users')
        .send({ name: 'Jardel', email: 'user@example.com', password: '123' })
        .end((err, res) => {
          expect(res.body.error.email).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should register a user and return a token', done => {
      request
        .post('/users')
        .send({ name: 'jardel', email: 'jardel1@example.com', password: '123567' })
        .end((err, res) => {
          expect(res.body.token).to.be.a('string')
          expect(res.status).to.be.eql(201)
          done(err)
        })
    })
  })
})