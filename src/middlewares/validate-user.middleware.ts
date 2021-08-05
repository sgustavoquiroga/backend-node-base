import Usuario from '../models/usuario.model';

const mailExist  = async( email = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({
        where: {
            email: email
        }
      });
      if (existeEmail){
          throw new Error(`Ya existe usuario con el email:${ email }`);
      }
}

// Verificar si existe usuario
  const findById = async( id = 0 ) => {
    const usuario = await Usuario.findByPk( id );
    if ( !usuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
export  { mailExist , findById };