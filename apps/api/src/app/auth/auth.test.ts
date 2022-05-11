import { signUp, login, cleanup, createUser } from '../test.utils';
import jwtDecode from 'jwt-decode'
import { Role } from '@infoshare-f3/shared-types'

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

  it('the token has user data', async () => {
    await signUp()
    const response = await login()
    const decodedToken = jwtDecode(response.body.token)
    const decodedTokenKeys = Object.keys(decodedToken)
    const keys = [
      'id',
      'createdAt',
      'name',
      'username',
      'password',
      'profileImageUrl',
      'role',
      'iat'
    ]
    expect(new Set(decodedTokenKeys)).toMatchObject(new Set(keys))
  })

  it('should log in as admin', async () => {
    await createUser({
      username: 'admin1',
      password: 'password1',
      role: 'admin'
    })
    const response = await login('admin1', 'password1')
    const decodedToken = jwtDecode<{ role: Role }>(response.body.token)
    const { role } = decodedToken
    expect(role).toBe("admin")
  })
});
