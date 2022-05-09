import { object, string } from 'yup';

export const createUserSchema = object({
  username: string().required('username is a required field'),
  name: string().required('name is a required field'),
  password: string()
    .required('password is a required field')
    .min(8, 'password must be at least 8 characters'),
}).required();

export const createUserSchemaExpress = object({
  body: createUserSchema,
}).required();

export const createTweetSchema = object({
  text: string()
    .required('text is a required field')
    .max(160, 'text must be at most 160 characters'),
}).required();

export const createTweetSchemaExpress = object({
  body: createTweetSchema,
}).required();

export const commentTweetSchema = object({
  text: string()
    .required('text is a required field')
    .max(160, 'text must be at most 160 characters'),
})

export const commentTweetSchemaExpress = object({
  body: commentTweetSchema,
}).required();