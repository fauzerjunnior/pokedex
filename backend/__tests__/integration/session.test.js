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

    await request(app).post('/users').send({
      name: 'Fauzer Junior',
      email: 'fauzer@gmail.com.br',
      password: '123456',
    });
  });

  it('should be able to create session', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'fauzer@gmail.com.br',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
  });

  afterAll(async () => {
    await connection.close();
  });
});
