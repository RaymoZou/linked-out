const axios = require('axios');

describe('HTTP Endpoints', () => {
  // Test case for GET /api/users
  test('GET / should return status 200', async () => {
    const response = await axios.get('http://localhost:3001/');
    expect(response.status).toBe(200);
  });

});
