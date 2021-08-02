
import { Request, Response } from 'express';

const notFoundMiddleware = ( req:Request, res:Response , next: any ) => {
    res.status(404).send ({
        status:404,
        message: 'Resource not found'
    });
}
export default notFoundMiddleware;