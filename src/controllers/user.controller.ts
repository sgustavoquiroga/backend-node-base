import { Request, Response } from 'express';
import { container }  from '../startup/container';

class UserController {
    async get (req: Request, res: Response ) {
        const _userService = container.resolve('userService');
        const { id } = req.params;
        const usuario = await _userService.get(id);
        // se valida que exista usuario
        if (usuario) {
            res.json(usuario);
        }else{
           res.status(404).json({
             msg:`user not found id: ${id}`
           });
        }
    }
    async getAll (req: Request, res: Response ) {
        const _userService = container.resolve('userService');
        const { limite = 10, pagina=0 } = req.query;
        /*
        const total = await Usuario.count();
        const users = await _userService.getAll(limite,pagina)
        */
        const [ total, users ] = await Promise.all([
            _userService.count(),
            _userService.getAll(limite,pagina)
        ]);

        res.json({
             total,
             users
        });
    }
    async createUser(req: Request, res: Response) {
        const _userService = container.resolve('userService');
        try
        {
            const user = await _userService.createUser(req.body);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:'Ocurrio un error al intentar registrar usuario '+ error
            });
        }
    }
    async update (req: Request, res: Response ) {
        try
        {
            const _userService = container.resolve('userService');
            const { id } = req.params;
            const { body } = req;
            const user = await _userService.update(id,body);
            if (!user){
                return res.status(404).json({
                    msg:`Usuario no encontrado, Id: ${ id }`
                });
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:'Ocurrió un error al intentar actualizar usuario'
            });
        }
    }

    async delete (req: Request, res: Response ) {
        const _userService = container.resolve('userService');
        const { id } = req.params;
        try
        {
            const user = await _userService.delete(id);
            if (!user){
                res.status(500).json({
                msg:'Ocurrió un error al intentar caducar usuario'
                });
            }
            res.status(200).json({user});

        } catch (error) {
            console.log(error);
            res.status(500).json({
            msg:'Ocurrió un error al intentar caducar usuario'
            });
        }
    }

}
export default new UserController()