import { object, string } from 'yup';

export const createUserSchema = object({
  body: object({
    username: string().required('username is a required field'),
    password: string()
      .required('password is a required field')
      .min(8, 'password must be at least 8 characters'),
  }),
});

export const createTweetSchema = object({
  body: object({
    text: string()
      .required('tweet is a required field')
      .max(160, 'tweet must be at most 160 characters'),
  }),
});
