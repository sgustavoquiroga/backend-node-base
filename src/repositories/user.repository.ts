import BaseRepository from './base.repository';
import Usuario from '../models/usuario.model';

class UserRepository extends BaseRepository {
    usuario = Usuario;
    constructor(){
        super(Usuario);
    }
}
export default UserRepository;