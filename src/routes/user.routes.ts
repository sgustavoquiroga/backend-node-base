import { Router } from 'express';
import { check } from 'express-validator';
import { UserController } from '../controllers';
import { mailExist, findById } from '../middlewares/validate-user.middleware';
import { isRole } from '../middlewares/validate-role.middleware';
import {
        validateJwt,
        validateFields,
        cacheMiddlewore,
       } from '../middlewares';


const router = Router();

router.get('/:id', [
    check('id').custom( findById ),
    validateFields
],UserController.get);

router.get('/', [cacheMiddlewore()],UserController.getAll);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( mailExist  ),
    check('rol', 'No es un rol permitido').isIn(['ADMIN', 'USER']),
    validateFields
], UserController.createUser);

router.put('/:id', UserController.update);

router.delete('/:id', [
    validateJwt,
    isRole('ADMIN','OTHER'),
    check('id').custom( findById ),
    validateFields
] ,UserController.delete );

export default router;