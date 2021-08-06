import { Router } from 'express';
import { check } from 'express-validator';
import { UserController } from '../controllers';
import validateFields from '../middlewares/validate-fields.middleware';
import { findById } from '../middlewares/validate-user.middleware';

const router = Router();

router.get('/:id', [
    check('id').custom( findById ),
    validateFields
],UserController.get);

export default router;