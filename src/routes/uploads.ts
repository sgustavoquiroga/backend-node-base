import { Router } from 'express';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validate-fields';
import uploadFile from '../controllers/uploads';

const router = Router();

router.post( '/', uploadFile );

export default router;