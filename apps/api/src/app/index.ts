import * as express from 'express';
import { router as tweetsRouter } from "./tweets"

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use(tweetsRouter)

export default app;
