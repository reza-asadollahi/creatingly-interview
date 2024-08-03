const request = require('supertest');
const { app } = require('../app');
const { getAllUsers, createUser} = require('../models/user');

describe('User API', () => {
  // it('should create a user', async () => {
  //   const response = await request(app)
  //       .post('/api/users')
  //       .send({ name: 'Test User', color: 'blue' });
  //
  //   expect(response.status).toBe(201);
  //   expect(response.body.name).toBe('Test User');
  // });

  it('should login and return existed user', async () => {
    const user = createUser('Test User','blue')
    const response = await request(app)
        .post('/api/users/sign-in')
        .send({ name: user.name });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(user);
  });

  it('should signup and return created user', async () => {
    const user = { name: 'Test User 2', color: 'blue' }
    const response = await request(app)
        .post('/api/users/sign-in')
        .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(user);
  });

  it('should get user info by user id', async () => {
    const user = createUser({ name: 'Test User 2', color: 'blue' })
    const response = await request(app)
        .get('/api/users/'+ user.id);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(user);
  });
});
