import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
import bcryptjs from 'bcryptjs';
import jwtGenetaror from '../helpers/jwt-generator';
import googleVerify from '../helpers/google-verify-token';

const login = async (req: Request, res: Response)=>{
    const  { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne( {
            where: {email: email}
        } );
        if (!usuario) {
            res.status(400).json({
             msg:`No existe usuario: ${email}`
           });
        }
        if (!usuario.estado) {
            res.status(400).json({
             msg:`Usuario no válido : ${email}`
           });
        }
        const validPassword = bcryptjs.compareSync( password , usuario.password );
        if (!validPassword){
            res.status(400).json({
                msg:`Password no valida`
              });
        }
        // Generar JWT
        const token = await jwtGenetaror( email );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Ocurrió un error al intentar autenticarse`,
            errors: error
        });
    }

}
const googleSingIn = async (req: Request, res: Response)=>{
    const { id_token } = req.body;
    try {
        // const googleUser = await googleVerify( id_token );
        const { nombre, img, email } = await googleVerify( id_token );
        let esUsuario = await Usuario.findOne({
            where: {
                email: email
            }
          });
        if ( !esUsuario ) {
            // se crea
            const data = {
                nombre,
                img,
                email,
                password : ':P',
                google: true
            }
            const usuario = new Usuario( data );
            await usuario.save();
        }else{
            // si el usuario no está activo
            if (!esUsuario.estado) {
                return res.status(401).json({
                    msg:`El usuario se encuentra bloqueado`
                });
            }
        }
        // se genera JWT
        const token = await jwtGenetaror( email );
        res.json({
            msg: 'ok Google SignIn',
            token,
            usuario: { nombre, img, email }
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no válido!'
        });
    }
}

export { login, googleSingIn } ;
