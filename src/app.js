import express from 'express';
import router from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlerwares();
    this.router();
  }

  middlerwares() {
    this.server.use(express.json());
  }

  router() {
    this.server.use(router);
  }
}

export default new App().server;
