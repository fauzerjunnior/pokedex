import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';

import '../../src/bootstrap';

describe('User', () => {
  let connection;
  let token;
  let id;

  beforeAll(async () => {
    connection = mongoose.connect(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );

    const userResponse = await request(app).post('/users').send({
      name: 'Fauzer Junior',
      email: 'fauzer@gmail.com.br',
      password: '123456',
    });

    const sessionResponse = await request(app).post('/sessions').send({
      email: 'fauzer@gmail.com.br',
      password: '123456',
    });

    id = userResponse.body.id;
    token = sessionResponse.body.token;
  });

  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Fauzer Junior',
      email: 'fauzer@gmail.com.br',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to get users', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Fauzer Junior',
        }),
      ])
    );
  });

  it('should be able to update user', async () => {
    const putResponse = await request(app)
      .put(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'João Junior',
        email: 'joao@gmail.com.br',
      });

    expect(putResponse.statusCode).toEqual(200);

    const getResponse = await request(app).get('/users');

    expect(getResponse.statusCode).toEqual(200);
    expect(getResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'João Junior',
          email: 'joao@gmail.com.br',
        }),
      ])
    );
  });

  it('should NOT update user for unauthenticated user', async () => {
    const putResponse = await request(app).put(`/users/${id}`).send({
      name: 'João Junior',
      email: 'joao@gmail.com.br',
    });

    expect(putResponse.statusCode).toEqual(401);
  });

  it('should be able to delete users', async () => {
    const response = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it('should NOT to delete user for unauthenticated user', async () => {
    const response = await request(app).delete(`/users/${id}`).send();

    expect(response.statusCode).toEqual(401);
  });

  afterAll(async () => {
    await connection.close();
  });
});
