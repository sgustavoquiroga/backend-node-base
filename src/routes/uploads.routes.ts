import { Router } from 'express';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validate-fields.middleware';
import uploadFile from '../controllers/uploads.controller';

const router = Router();

router.post( '/', uploadFile );

export default router;