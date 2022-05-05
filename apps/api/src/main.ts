/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import app from './app';

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
