import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
// import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = "Welcome to crud mastery backend server!";
  res.send(a);
};

app.get('/', getAController);

export default app;
