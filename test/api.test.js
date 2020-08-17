const request = require('supertest');

const app = require('../src/app');

describe('POST /api/', () => {
  it('responds with status code 404, non existing enpoint', (done) => {
    request(app)
      .post('/api/non-existing')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with status code 200, valid request', (done) => {
    request(app)
      .post('/api/records')
      .send({
        startDate: "2016-01-26",
        endDate: "2018-02-02",
        minCount: 2700,
        maxCount: 3000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('responds with status code 400, empty post body', (done) => {
    request(app)
      .post('/api/records')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('responds with status code 404, no records found', (done) => {
    request(app)
      .post('/api/records')
      .send({
        startDate: "2030-09-26",
        endDate: "2030-12-02",
        minCount: 0,
        maxCount: 2
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
