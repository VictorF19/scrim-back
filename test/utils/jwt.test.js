/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const RequestMock = require('mock-express-request');
const ResponseMock = require('mock-express-response');

const { generateToken, validateAuthorization } = require('../../src/util/jwt');

describe('JWT methods test', () => {
  it('Generate Token test', async () => {
    const object = { id: 'b078a16d-12de-4b5b-85bb-a21d348c75b3' };

    const result = generateToken(object);

    // matches the jwt token format
    expect.stringMatching(result, /(^[\w-]*\.[\w-]*\.[\w-]*$)/gm);
  });

  it('Validate Authorization', async () => {
    const object = { id: 'b078a16d-12de-4b5b-85bb-a21d348c75b3' };

    const token = generateToken(object);

    const reqMock = new RequestMock({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resMock = new ResponseMock({ request: reqMock });

    await validateAuthorization(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(200);
  });

  it('Validate Authorization not sending the Authorization header', async () => {
    const reqMock = new RequestMock({});

    const resMock = new ResponseMock({ request: reqMock });

    await validateAuthorization(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(401);
    expect(resMock._getJSON().message).toBe('Authentication required');
  });

  // eslint-disable-next-line quotes
  it(`Validate Authorization not sending the 'Bearer' text before token`, async () => {
    const object = { id: 'b078a16d-12de-4b5b-85bb-a21d348c75b3' };

    const token = generateToken(object);

    const reqMock = new RequestMock({
      headers: {
        Authorization: `${token}`,
      },
    });

    const resMock = new ResponseMock({ request: reqMock });

    await validateAuthorization(reqMock, resMock, () => null);

    expect(resMock.statusCode).toBe(401);
    expect(resMock._getJSON().message).toBe('Invalid Authentication format');
  });

  // it('Validate Authorization sending invalid Token', async () => {
  //   const reqMock = new RequestMock({
  //     headers: {
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDg1MjIwMzksImV4cCI6MTY0ODUyNTYzOX0.ZBcpVli9mHofxUQdaiNlxJ4qSjrHmqvtQabRhg9gUig',
  //     },
  //   });

  //   const resMock = new ResponseMock({ request: reqMock });

  //   await validateAuthorization(reqMock, resMock, () => null);

  //   expect(resMock.statusCode).toBe(401);
  //   expect(resMock._getJSON().message).toBe('Invalid token provided');
  // });
});
