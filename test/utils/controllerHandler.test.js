/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const RequestMock = require('mock-express-request');
const ResponseMock = require('mock-express-response');
require('dotenv').config();

const { controllerHandler } = require('../../src/util/controllerHandler');

describe('Controller Handler tests', () => {
  it('Correct call of the controller handler', async () => {
    const handler = () => async (_, res) =>
      res.status(200).json({ message: 'ok' });
    const someExpressFunction = handler();
    const someControllerHandler = controllerHandler(someExpressFunction);

    const reqMock = new RequestMock({});

    const resMock = new ResponseMock({
      request: reqMock,
    });

    await someControllerHandler(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(200);
    expect(resMock._getJSON().message).toBe('ok');
  });

  it('Call of the controller handler throwing an error and logging the error', async () => {
    // Setting the NODE_ENV variable because it's value inside on this context is 'test'
    const copyOfOriginalValue = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const handler = () => async (_, res) => {
      throw new Error();
    };
    const someExpressFunction = handler();
    const someControllerHandler = controllerHandler(someExpressFunction);

    const reqMock = new RequestMock({});

    const resMock = new ResponseMock({
      request: reqMock,
    });

    await someControllerHandler(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(500);
    expect(resMock._getJSON().message).toBe('An unexpected error ocurred');
    process.env.NODE_ENV = copyOfOriginalValue;
  });

  it('Call of the controller handler throwing an error and not logging the error', async () => {
    const handler = () => async (_, res) => {
      throw new Error();
    };
    const someExpressFunction = handler();
    const someControllerHandler = controllerHandler(someExpressFunction);

    const reqMock = new RequestMock({});

    const resMock = new ResponseMock({
      request: reqMock,
    });

    await someControllerHandler(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(500);
    expect(resMock._getJSON().message).toBe('An unexpected error ocurred');
  });
});
