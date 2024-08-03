const request = require('supertest');
const { app } = require('../app');
const { getAllUsers } = require('../models/user');

describe('User API', () => {
  it('should create a user', async () => {
    const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', color: 'blue' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test User');
  });

  it('should get all users', async () => {
    const response = await request(app)
        .get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(getAllUsers());
  });
});
