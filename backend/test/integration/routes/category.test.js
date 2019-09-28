import Category from '../../../src/models/Category'

describe('Routes Category', () => {

  let categoryDefault = {
    id: 100,
    name: 'Outros',
    flow_type: 'both'
  }

  beforeEach(done => {
    Category.query().truncate()
      .then(() => {
        Category.query().insert(categoryDefault)
          .then(category => {
            done()
          })
      })
  })

  describe('Route GET /categories', () => {
    it('should return a list of categories', done => {
      request
        .get('/categories')
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.status).to.be.eql(200)
          done(err)
        })
    })
  })
})