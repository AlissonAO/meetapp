import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddlerware from './app/middlewares/auth';

import Usercontroller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

const routers = new Router();
const upload = multer(multerConfig);

routers.post('/users', Usercontroller.store);
routers.post('/sessions', SessionController.store);

routers.use(authMiddlerware);

routers.put('/users', Usercontroller.update);
routers.post('/files', upload.single('file'), FileController.store);


export default routers;
