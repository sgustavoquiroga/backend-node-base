import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
const bcryptjs = require('bcryptjs');
import { container }  from '../startup/container';

class UserController {

    async get (req: Request, res: Response ) {
        const userService = container.resolve('userService');
        const { id } = req.params;
        const usuario = await userService.get(id);
        // se valida que exista usuario
        if (usuario) {
            res.json(usuario);
        }else{
           res.status(404).json({
             msg:`user not found id: ${id}`
           });
        }

    }
}
export default new UserController()