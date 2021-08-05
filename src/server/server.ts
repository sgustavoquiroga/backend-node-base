import express, { Application } from 'express';
import userRoutes from '../routes/usuarios.routes';
import authRoutes from '../routes/auth.routes';
import uploadRoutes from '../routes/uploads.routes';
import { homeRoutes }   from '../routes/index';
import cors from 'cors';
import db from '../config/connection';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
require('express-async-errors');
import { errorMiddleware,notFoundMiddleware } from '../middlewares';

 import { setup } from '../startup/container';
 setup();

// import loadContainer from '../startup/container';
// import HomeRoutes from '../routes/home.routes';

class Server{
    private app: Application;
    private port: string;
    //private _homeRouter: any;
    private apiPath = {
       usuarios: '/api/usuarios',
       auth: '/api/auth',
       uploads: '/api/uploads',
       home: '/home',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '80';
        this.dbConnection();
        this.middlewares();
        // definir rutas
        this.routes();
        // loadContainer(this.app);
    }
    async dbConnection() {
        try {
          await db.authenticate();
          console.log ('conectado a DB');
        } catch (error) {
          throw new Error (error);
        }

    }
    middlewares() {
    // CORS
    this.app.use(cors());

    // Helmet
    this.app.use(helmet());

    // read Body
    this.app.use(express.json());

    // public folder
    this.app.use(express.static('public'));

    // fileupload
    this.app.use( fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));

    // custon Middleware
    this.app.use(errorMiddleware);
    //this.app.use(notFoundMiddleware);

    }
    routes() {
       this.app.use( this.apiPath.usuarios, userRoutes);
       this.app.use( this.apiPath.auth, authRoutes);
       this.app.use( this.apiPath.uploads, uploadRoutes);
       this.app.use( this.apiPath.home, homeRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en '+ this.port);
        })
    }
}
export default Server;