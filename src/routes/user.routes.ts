import { Router } from 'express';
import { check } from 'express-validator';
import { UserController } from '../controllers';
import validateFields from '../middlewares/validate-fields.middleware';
import { mailExist, findById } from '../middlewares/validate-user.middleware';
import validateJwt from '../middlewares/validate-jwt.middleware';
import { isRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.get('/:id', [
    check('id').custom( findById ),
    validateFields
],UserController.get);

router.get('/', UserController.getAll);

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