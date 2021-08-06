import Usuario from '../models/usuario.model';
const bcryptjs = require('bcryptjs');

class UserRepository   {
    private models: any;

    constructor () {
        this.models = Usuario;
    }
    public async get(id: string){
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
    public async update(id: string, data:any){
        try 
        {
            const usuario = await this.models.findByPk ( id );
            if (!usuario){
                console.log(`Usuario no encontrado, Id: ${ id }`);
                return null;
            }
            await usuario.update(data);
            return usuario;
        } catch (error) {
                console.log(error);
                return null;
        }

    }
    public async delete(id: string){
        try
        {
            const usuario = await this.models.findByPk ( id );
            if (!usuario){
                console.log(`Usuario no encontrado, Id: ${ id }`);
                return null;
            }
            await usuario.update ({
                estado: false
            });
            return usuario;
        } catch (error) {
                console.log(error);
                return null;
        }

    }
}
export default UserRepository;