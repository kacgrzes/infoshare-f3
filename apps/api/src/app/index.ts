import * as express from 'express';
import { router as tweetsRouter } from './tweets';
import { router as usersRouter } from './users';
import { router as authRouter } from './auth';
import { json } from 'body-parser';

const app = express();

const apiV1Router = express.Router();

apiV1Router.use(json());
apiV1Router.use(tweetsRouter);
apiV1Router.use(usersRouter);

app.use(json(), authRouter);
app.use('/api/1.0', apiV1Router);

export default app;
