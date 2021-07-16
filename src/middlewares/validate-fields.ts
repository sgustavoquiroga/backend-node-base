import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

const validateFields = ( req:Request, res:Response , next: any ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}
export default validateFields;