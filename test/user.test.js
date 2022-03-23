/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

const RequestMock = require('mock-express-request');
const ResponseMock = require('mock-express-response');
const { handler } = require('../src/controllers/user/post');
const models = require('./mocks/user.mock');
require('dotenv').config();

describe('User POST controller unit tests', () => {
  it('201 OK - User created successfully', async () => {
    const body = {
      name: 'erick_teste',
      email: 'erickteste@gmail.com',
      password: '123abc@ABC',
      nickname: 'Kinho',
    };

    const user = {
      name: 'erick_teste',
      email: 'erickteste@gmail.com',
      nickname: 'Kinho',
    };

    const reqMock = new RequestMock({
      body,
    });

    const resMock = new ResponseMock({
      request: reqMock,
    });

    await handler(models)(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(201);
    expect(resMock._getJSON().user).toStrictEqual(user);
    expect(resMock._getJSON()).toHaveProperty('token');
  });
});
