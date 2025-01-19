import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
// import { ValidatorAdapter } from '@/lib';
import { ValidatorAdapter } from '../lib/shared';
import { StatusCodes } from 'http-status-codes';

/**
 * VALIDATION MIDDLEWARE
 * @param schema 
 * @returns 
 */
function validationReq(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = ValidatorAdapter.validate(schema, req.body);
            next();
         
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                res.status(StatusCodes.BAD_REQUEST).json({ 
                    error: 'Invalid data', 
                    details: errorMessages 
                });

            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: 'Internal Server Error'
                });
            }
        }
    };
}

export default validationReq;