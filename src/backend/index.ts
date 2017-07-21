import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as mongoose from 'mongoose';

import { Rest } from './rest';

declare var process, __dirname, global;

export class Backend {
  public app: any;
  public server: any;
  private mongo: any;
  private rest: any;
  private root: string;

  constructor() {
    // Create expressjs application
    this.app = express();
    this.app.use(bodyParser.json())

    // Setup routes
    this.routes();

    // Create server
    this.server = http.createServer(this.app);

    // Create database connections
    this.databases();
  }

  private routes(): void {
    // Setup Express router
    let router: express.Router;
    router = express.Router();

    // Root path
    const root = path.join(path.resolve(__dirname, '../../target'));

    // Static assets
    this.app.use('/assets', serveStatic(path.resolve(root, 'assets')));
    this.app.use('/favicon.ico', serveStatic(path.resolve(root, 'favicon.ico')));

    // Setup REST API
    this.rest = new Rest();
    this.app.use('/rest', this.rest.router);

    // Set router to serve index.html (e.g. single page app)
    router.get('/', (request: express.Request, result: express.Response) => {
      result.sendFile(path.join(root, '/index.html'));
    });

    // Set app to use router as the default route
    this.app.use('*', router);
  }

  private databases(): void {
    // MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/angular-mean-starter';
    this.mongo = mongoose.connect(MONGODB_URI, { useMongoClient: true });
    (<any>mongoose).Promise = global.Promise;
  }
}
