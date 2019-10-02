import User from '../../../src/models/User'
import CashFlow from '../../../src/models/CashFlow'
import Category from '../../../src/models/Category'

describe('Routes Flow Balance', () => {

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
    description: 'Shopping',
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

  describe('Route GET /incomes', () => {
    it('should return an error when the token is not provided', done => {
      request
        .get('/incomes')
        .end((err, res) => {
          expect(res.body.error).to.be.a('string')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })

    it('should return an error when the token is invalid', done => {
      request
        .get('/incomes')
        .set('authorization', 'Bearer weqnweq.eqw33434mpo3nf.ebipwewpe0er')
        .end((err, res) => {
          expect(res.body.error).to.be.a('string')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })

    it('should return an error when the token is valid but the user is not in the database', done => {
      request
        .get('/incomes')
        .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MH0.GR7LXNTFGdDfGftnt77aDFxYVrm5MNQ16UogsqSGjvI')
        .end((err, res) => {
          expect(res.body.error).to.be.a('string')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })

    it('should return a list of expense and income summaries', done => {
      request
        .get('/cashflow/balance')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })

    it('should return total expenses and income', done => {
      request
        .get('/cashflow/balance/flowtype')
        .set('authorization', `Bearer ${ token } `)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })
  })
})