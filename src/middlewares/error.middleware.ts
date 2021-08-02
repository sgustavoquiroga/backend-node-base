import { Request, Response } from 'express';


const errorMiddleware = (error: any, req:Request, res:Response , next: any ) => {
    const httpStatus = error.status || 500;
    res.status (httpStatus).send({
        status: httpStatus,
        message: error.message || 'Internal server error'
    })

}
export default errorMiddleware;