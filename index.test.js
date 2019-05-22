const server = require('.index');
const db = require('./database/dbConfig');


describe('get /', () => {
    it('should respond with 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    })
  
  });
