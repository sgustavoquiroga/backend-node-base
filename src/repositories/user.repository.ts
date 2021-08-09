import Usuario from '../models/usuario.model';
import BaseRepository from './base.repository';
const bcryptjs = require('bcryptjs');

class UserRepository extends BaseRepository {
    private currentModel: any;
    constructor () {
        const usuario = Usuario;
        super(usuario);
        this.currentModel = usuario;
    }
    // here custom Method
    async createUser(data: any){
        const {  nombre, email, password, rol } = data;
        const user = await this.currentModel.create({ nombre, email, password, rol });
        try {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync( password, salt );
            // Guardar en BD
            await user.save();
           return user;
        } catch (error) {
            console.log(error);
            return null;
        }

    }
}
export default UserRepository;