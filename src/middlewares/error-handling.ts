import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app-error'

export function errorHandling(
    error: any,
    request: Request,
    response: Response,
    _: NextFunction,
) {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message })
        return
    }

    response.status(500).json({ message: error.message })
    return
}