import express, { Application } from 'express';
import userRoutes from '../routes/usuarios';
import authRoutes from '../routes/auth';
import uploadRoutes from '../routes/uploads';
import cors from 'cors';
import db from '../config/connection';
import fileUpload from 'express-fileupload';

class Server{
    private app: Application;
    private port: string;
    private apiPath = {
       usuarios: '/api/usuarios',
       auth: '/api/auth',
       uploads: '/api/uploads',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '80';
        this.dbConnection();
        this.middlewares();
        // definir rutas
        this.routes();
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

    // Lectura del Body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static('public'));

    // fileupload
    this.app.use( fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));

    }
    routes() {
       this.app.use( this.apiPath.usuarios, userRoutes);
       this.app.use( this.apiPath.auth, authRoutes);
       this.app.use( this.apiPath.uploads, uploadRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en '+ this.port);
        })
    }
}
export default Server;