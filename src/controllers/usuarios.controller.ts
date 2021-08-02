import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
const bcryptjs = require('bcryptjs');

export const getUsuarios= async (req: Request, res: Response )=> {
    const { limite = 5, pagina = 0 } = req.query;
    // const fin = Number(limite) * Number(pagina);
    // const inicio =  fin-Number(limite);
    /*
    const total = await Usuario.count();
    const usuarios = await Usuario.findAll({
        where: {
            estado: true
        },
        limit: Number(limite),
        offset: inicio
      });
    */
    /* se hace esto para que se ejecuten las dos promesas en simultaneo
       en el codigo anterior la segunda se ejecuta despues que  la primera devuelve resultado*/
    const [ total, usuarios ] = await Promise.all([
           Usuario.count(),
           Usuario.findAll({
            where: {
                estado: true
            },
            limit: Number(limite),
            offset: Number(pagina)
          })
    ]);

   res.json({
    total,
    usuarios
   });
}
export const getUsuario= async (req: Request, res: Response )=> {
    const { id } = req.params;
    const usuario = await Usuario.findByPk( id );
    // se valida que exista usuario
    if (usuario) {
        res.json(usuario);
    }else{
       res.status(404).json({
         msg:`No existe usuario con id: ${id}`
       });
    }
    // se valida que sea usuario habilitado
}

export const postUsuario= async (req: Request, res: Response )=> {
    const { body } = req;
    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });
    try {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
        // Guardar en BD
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error al intentar registrar usuario '+ error
        });
    }
}
export const putUsuario= async(req: Request, res: Response )=> {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk ( id );
        if (!usuario){
            return res.status(404).json({
                msg:`Usuario no encontrado, Id: ${ id }`
            });
        }
        await usuario.update(body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrió un error al intentar actualizar usuario'
        });
    }
}
export const deleteUsuario= async(req: Request, res: Response )=> {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk ( id );
        if (!usuario){
            return res.status(404).json({
                msg:`Usuario no encontrado, Id: ${ id }`
            });
        }
        // await usuario.destroy(); eliminación física
        await usuario.update ({
            estado: false
        });
        const usuarioAutenticado = req.usuario;

        res.json({
               usuario,
               usuarioAutenticado
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrió un error al intentar eliminar usuario'
        });
    }
}