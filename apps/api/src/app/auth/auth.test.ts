import { signUp, login, cleanup } from '../test.utils';

afterEach(cleanup);

describe('Auth', () => {
  it('returns 404 when no user is found', async () => {
    const response = await login();

    expect(response.statusCode).toEqual(404);
  });
  it('returns message when user not found', async () => {
    const response = await login();

    expect(response.body).toMatchObject({
      message: 'User not found',
    });
  });

  it('returns 401 when invalid credentials', async () => {
    await signUp();
    const response = await login('user1', 'password2');

    expect(response.statusCode).toEqual(401);
  });

  it('returns invalid credentials message', async () => {
    await signUp();
    const response = await login('user1', 'password2');

    expect(response.body).toMatchObject({
      message: 'Invalid credentials',
    });
  });
  it('returns 200 when credentials are ok', async () => {
    await signUp();
    const response = await login();

    expect(response.statusCode).toEqual(200);
  });

  it('returns token when credentials are ok', async () => {
    await signUp();
    const response = await login();

    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });
});
