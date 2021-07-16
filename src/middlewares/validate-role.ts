import { Request, Response } from 'express';

const isAdminRole = ( req:Request, res:Response , next: any ) => {
    if (!req.usuario){
       return res.status(500).json({
           msg: 'No es posible validar rol debe antes validar token!'
       })
    }
    const { rol , nombre } = req.usuario;
    if ( rol !=='ADMIN' ) {
        return res.status(401).json({
            msg: 'El usuario no está autorizado para realizar esta operación!'
        });

    }
    next();
}

const isRole = ( ...roles: string[] ) => {
     return (req:Request, res:Response , next: any ) => {
        if (!req.usuario){
            return res.status(500).json({
                msg: 'No es posible validar rol debe antes validar token!'
            })
         }
        if (!roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: 'El usuario no está autorizado para realizar esta operación!'
            });
        }
        next();
     }
 }
export  { isAdminRole, isRole };