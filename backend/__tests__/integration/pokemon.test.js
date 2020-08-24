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

    const sessionResponse = await request(app).post('/sessions').send({
      email: 'fauzer@gmail.com.br',
      password: '123456',
    });

    token = sessionResponse.body.token;
  });

  it('should be able to get pokemons', async () => {
    const response = await request(app)
      .get('/pokemons')
      .set('Authorization', `Bearer ${token}`)
      .send();

    console.log(response);

    expect(response.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await connection.close();
  });
});
