import User from '../../../src/models/User'
import CashFlow from '../../../src/models/CashFlow'
import Category from '../../../src/models/Category'

describe('Routes Expense', () => {

  const userDefault = {
    id: 50,
    name: 'User Test',
    email: 'user@example.com',
    password: '123'
  }

  let categoryDefault = {
    id: 100,
    name: 'Outros',
    flow_type: 'both'
  }

  let expenseDefault = {
    id: 150,
    description: 'Comprei um jatinho',
    value: 2000,
    category_id: categoryDefault.id,
    user_id: userDefault.id,
    flow_type: 'expense',
    date: '05/10/2017'
  }

  let token

  beforeEach(done => {
    Category.query().truncate()
      .then(() => {
        CashFlow.query().truncate()
          .then(() => {
            User.query().truncate()
              .then(() => {
                User.query().insert(userDefault)
                  .then(user => {
                    Category.query().insert(categoryDefault)
                      .then(category => {
                        CashFlow.query().insert(expenseDefault)
                          .then(expense => {
                            expenseDefault = expense
                            token = jwt.sign({id: user.id}, APP_SECRET)
                            done()
                        })
                      })
                  })
              })
          })

      })
  })

  describe('Route GET /expenses', () => {
    it('should return an error when the token is not provided', done => {
      request
        .get('/expenses')
        .end((err, res) => {
          expect(res.body.error).to.be.a('string')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })

    it('should return an error when the token is invalid', done => {
      request
        .get('/expenses')
        .set('authorization', 'Bearer weqnweq.eqw33434mpo3nf.ebipwewpe0er')
        .end((err, res) => {
          expect(res.body.error).to.be.a('string')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })

    it('should return an error when the token is valid but the user is not in the database', done => {
      request
        .get('/expenses')
        .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MH0.GR7LXNTFGdDfGftnt77aDFxYVrm5MNQ16UogsqSGjvI')
        .end((err, res) => {
          expect(res.body.error).to.be.a('string')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })

    it('should return a list of expenses', done => {
      request
        .get('/expenses')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })
  })

  describe('Route GET /expenses/:id', () => {
    it('should return an empty object', done => {
      request
        .get('/expenses/efsdfs')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body).to.be.eql({})
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })

    it('should return an expense', done => {
      request
        .get('/expenses/150')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })

  })

  describe('Route POST /expenses', () => {
    it('should return a list of errors if required data is not entered', done => {
      request
        .post('/expenses')
        .set('authorization', `Bearer ${ token } `)
        .send({
          value: 2000
        })
        .end((err, res) => {
          expect(res.body.error.description).to.be.an('array')
          expect(res.body.error.category_id).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should return a list of errors if invalid data is entered', done => {
      request
        .post('/expenses')
        .set('authorization', `Bearer ${ token } `)
        .send({
          description: 'ganhos milagrosos das ações da OI',
          value: 'sou um texto',
          category_id: categoryDefault.id
        })
        .end((err, res) => {
          expect(res.body.error.value).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should register an expense and return it', done => {
      request
        .post('/expenses')
        .set('authorization', `Bearer ${ token } `)
        .send({
          description: 'ganhos milagrosos das ações da OI',
          value: 3000,
          category_id: categoryDefault.id,
          date: '10/10/2018'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.eql(201)
          done(err)
        })
    })
  })

  describe('Route PUT /expenses/:id', () => {
    it('should return a list of errors if required data is not entered', done => {
      request
        .put('/expenses/150')
        .set('authorization', `Bearer ${ token } `)
        .send({
          value: 2000
        })
        .end((err, res) => {
          expect(res.body.error.description).to.be.an('array')
          expect(res.body.error.category_id).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should return a list of errors if invalid data is entered', done => {
      request
        .put('/expenses/150')
        .set('authorization', `Bearer ${ token } `)
        .send({
          description: 'ganhos milagrosos das ações da OI',
          value: 'sou um texto',
          category_id: categoryDefault.id
        })
        .end((err, res) => {
          expect(res.body.error.value).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    it('should update an expense and return it', done => {
      request
        .put('/expenses/150')
        .set('authorization', `Bearer ${ token } `)
        .send({
          description: 'ganhos milagrosos das ações da OI',
          value: 3000,
          category_id: categoryDefault.id,
          date: '12/12/2014'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })
  })

  describe('Route DELETE /expenses/:id', () => {
    
    it('should return an error if there is no expense', done => {
      request
        .delete('/expenses/250')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body.error).to.be.an('object')
          expect(res.status).to.be.eql(404)
          done(err)
        })
    })

    it('should delete an expense', done => {
      request
        .delete('/expenses/150')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.status).to.be.eql(204)
          done(err)
        })
    })
  })

  describe('Route GET /expenses/total/:year/year', () => {
    
    it('should return an error if year or month is invalid', done => {
      request
        .get('/expenses/20000/08/period')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body.error.year).to.be.an('array')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })

    // SQLITE does not work

    // it('should return a list of total expense per year and month', done => {
    //   request
    //     .get('/expenses/2000/08/period')
    //     .set('authorization', `Bearer ${ token } `)
    //     .end((err, res) => {
    //       expect(res.status).to.be.eql(200)
    //       expect(res.body).to.be.an('array')
    //       done(err)
    //     })
    // })
  })
})