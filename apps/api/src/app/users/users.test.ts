import { prisma } from '../prisma';
import { signUp, getAllUsers, cleanup } from '../test.utils';

beforeEach(async () => {
  await cleanup();
});

describe('Users', () => {
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

  it('returns 200 OK when getting all users', async () => {
    const response = await getAllUsers();

    expect(response.statusCode).toEqual(200);
  });

  it('returns users when getting all users', async () => {
    const response = await getAllUsers();

    expect(response.body).toHaveProperty('users');
  });

  it('returns users with properties: username, id', async () => {
    await signUp();
    const response = await getAllUsers();
    const firstUser = response.body.users[0];
    const keys = new Set(Object.keys(firstUser));

    expect(keys).toEqual(new Set(['username', 'id']));
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
