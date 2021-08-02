import { Router } from 'express';
import { getUsuarios,
         getUsuario,
         postUsuario,
         putUsuario, deleteUsuario
        } from '../controllers/usuarios.controller';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate-fields.middleware';
import validateJwt from '../middlewares/validate-jwt.middleware';
import { isAdminRole, isRole } from '../middlewares/validate-role.middleware';

import { mailExist , findById } from '../middlewares/validate-user.middleware';

const router = Router();

router.get('/', getUsuarios );

router.get('/:id', [
    check('id').custom( findById ),
    validateFields
],getUsuario );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( mailExist  ),
    check('rol', 'No es un rol permitido').isIn(['ADMIN', 'USER']),
    validateFields
], postUsuario );
router.put('/:id', putUsuario );
router.delete('/:id', [
    validateJwt,
    // esAdminRole,
    isRole('USER','SELLER','SUPERVISOR','OTHER'),
    check('id').custom( findById ),
    validateFields
] ,deleteUsuario );

export default router;