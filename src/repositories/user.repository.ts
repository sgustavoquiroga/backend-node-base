import BaseRepository from './base.repository';
import Usuario from '../models/usuario.model';
const bcryptjs = require('bcryptjs');

class UserRepository  implements  BaseRepository < typeof Usuario> {
    private models: any;

    constructor () {
        this.models = Usuario;
    }
    public async findById (id: string){
        const usuario = await this.models.findByPk( id );
        // si existe
        if (usuario) {
           return(usuario);
        }else{
          return null;
        }
    }
    public async getAll(){
        const usuarios = await this.models.findAll({
            where: {
                estado: true
            }
        });
        return(usuarios);
    }
    public async create(data: any){
        const {  nombre, email, password, rol } = data;
        const usuario = await this.models.create({ nombre, email, password, rol });
        try {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( password, salt );
            // Guardar en BD
            await usuario.save();
           return usuario;
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    update(){

    }

    
}
export default UserRepository;