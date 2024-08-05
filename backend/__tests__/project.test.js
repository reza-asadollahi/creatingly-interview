const request = require('supertest');
const {app} = require('../app');
const {createProject, getAllProject} = require('../models/project');
const {createUser} = require('../models/user');

describe('Project API', () => {
  const user1 = createUser('user1', 'blue')
  const user2 = createUser('user2', 'red')


  it('should create a project', async () => {
    const response = await request(app)
        .post('/api/projects')
        .set({userId: user1.id})
        .send({name: 'Test Project'});

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Project');
  });

  it('should get all projects', async () => {
    const response = await request(app)
        .get('/api/projects').set({ userId:  user1.id })

    expect(response.status).toBe(200);
    expect(response.body).toEqual(getAllProject());
  });

  it('should delete a project by owner', async () => {
    const project = createProject('Test Project',  user1.id);

    const response = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('userId',  user1.id);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Project deleted');
  });

  it('should not delete a project by non-owner', async () => {
    const project = createProject('Test Project',  user2.id);

    const response = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('userId',  user1.id);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Not authorized');
  });
});
