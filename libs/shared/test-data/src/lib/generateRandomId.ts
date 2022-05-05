import * as cuid from 'cuid';

export const generateRandomId = () => {
  return cuid();
};
