import { prisma } from '../prisma';
import { signUp, login, getAllUsers, deleteUser, cleanup, createUser } from '../test.utils';
import jwtDecode from 'jwt-decode';

afterEach(cleanup);

describe('Users', () => {
  describe('post user', () => {
    it('returns 200 OK when sign up request is valid', async () => {
      const response = await signUp();

      expect(response.statusCode).toEqual(200);
    });

    it('returns success message when user was signed up', async () => {
      const response = await signUp();

      expect(response.body).toMatchObject({
        message: 'User was signed up successfully',
      });
    });

    it('saves the user to database', async () => {
      await signUp();
      const usersLength = await prisma.user.count();

      expect(usersLength).toBe(1);
    });

    it('saved password should be hashed', async () => {
      await signUp();
      const firstUser = await prisma.user.findFirst();

      expect(firstUser.password).not.toEqual('password1');
    });

    it('returns 409 when user already exists', async () => {
      await signUp();
      const response = await signUp();

      expect(response.status).toEqual(409);
    });

    it('returns user already exists message for duplicate users', async () => {
      await signUp();
      const response = await signUp();

      expect(response.body).toMatchObject({
        message: 'Username already taken',
      });
    });
  });

  describe('validate user', () => {
    it.each([
      {
        username: '',
        password: 'password1',
        name: 'John Doe',
        message: 'username is a required field',
      },
      {
        username: 'user2',
        password: '',
        name: 'John Doe',
        message: 'password is a required field',
      },
      {
        username: 'user2',
        password: 'pass',
        name: 'John Doe',
        message: 'password must be at least 8 characters',
      },
      {
        username: 'user1',
        password: 'password1',
        name: '',
        message: 'name is a required field',
      },
    ])('test case: $message', async ({ username, password, name, message }) => {
      const response = await signUp(username, password, name);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0]).toBe(message);
    });
  });

  describe('get users', () => {
    it('returns 200 OK when getting all users', async () => {
      const response = await getAllUsers();

      expect(response.statusCode).toEqual(200);
    });

    it('returns users when getting all users', async () => {
      const response = await getAllUsers();

      expect(response.body).toHaveProperty('users');
    });

    it('returns users with properties: username, id, name, profileImageUrl', async () => {
      await signUp();
      const response = await getAllUsers();
      const firstUser = response.body.users[0];
      const keys = new Set(Object.keys(firstUser));

      expect(keys).toEqual(new Set(['username', 'id', 'name', 'profileImageUrl']));
    });
  });

  describe('delete users', () => {
    it('cannot delete user if not admin', async () => {
      await signUp()
      const loginResponse = await login()
      const token = loginResponse.body.token
      const user = jwtDecode<{ id: string }>(token);
      const userId = user.id

      const response = await deleteUser(userId, token)
      expect(response.status).toBe(401)
    })
    it('can delete user when admin', async () => {
      await createUser({
        username: 'admin1',
        password: 'password1',
        role: 'admin',
      })
      const loginResponse = await login('admin1', 'password1')
      const token = loginResponse.body.token
      const user = jwtDecode<{ id: string }>(token);
      const userId = user.id

      const response = await deleteUser(userId, token)
      expect(response.status).toBe(200)
    })
  })
});
