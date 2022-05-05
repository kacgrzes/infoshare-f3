import faker from '@faker-js/faker';

export const generateRandomId = () => {
  return faker.database.mongodbObjectId();
};
