import { Request, Response, NextFunction } from 'express';

interface IError {
    message: string;
    statusCode: number;
    stack: string;
}
const errorHandler = (
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);

    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(500).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
};

export default errorHandler;
