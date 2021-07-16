import { Router } from 'express';
import { login, googleSingIn }  from '../controllers/auth';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';

const router = Router();

router.post('/login',[
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    validateFields
],login );

router.post('/google',[
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validateFields
],googleSingIn );

export default router;