import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Usuario from '../models/usuario';


const validateJwt = async ( req:Request, res:Response , next: any ) => {
    const token = req.header('Authorization');

    if ( !token ) {
       return res.status(400).json({
         msg: 'Parámetro de autenticación nulo!'
       });
    }
    try {
        // const paiload = jwt.verify( token , process.env.SECRETORPRIVATEKEY);
        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY || '793@cd7ddbbdb6V#6733fd&d3543c0eA075');
        // se lee el usuario que corresponde al uid
        const usuario = await Usuario.findOne({ where: { email:  uid } });

        // se verifica que el usuario existe en la bd
        if ( !usuario ){
            return res.status(401).json({
                msg: 'Parámetro de autenticación no válido - usuario no existe!'
              });
        }
        // se verifica que sea usuario activo
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Parámetro de autenticación no válido - usuario no está habilidato!'
              });
        }

        // se envía el usuario autenticado
        req.usuario = usuario;
        console.log ('uid: ', uid );
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Parámetro de autenticación no válido!'
          });
    }
}

export default validateJwt;