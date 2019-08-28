import { Router } from 'express';

import authMiddlerware from './app/middlewares/auth';

import Usercontroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';


const routers = new Router();


routers.post('/users', Usercontroller.store);
routers.post('/sessions', SessionController.store);


routers.put('/users', authMiddlerware, Usercontroller.update);
export default routers;
