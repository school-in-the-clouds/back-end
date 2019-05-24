const request = require('supertest');
const apiRoutes = require('.apiRoutes.js');

describe('index', () => {
  it('sets the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
describe('GET /', () => {
  it('should return 200 OK', () => {
    
    return request(server)
      .get('/')
      .expect(200);
  });

  it('using the squad (async/await)', async () => {
 
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });

  it('should return JSON using done callback', done => {
   
    request(server)
      .get('/')
      .then(res => {
        expect(res.type).toBe('application/json'); 
        done();
      });
  });
});