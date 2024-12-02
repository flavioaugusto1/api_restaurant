import { NextFunction, Request, Response } from 'express'

export class ProductController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.json({ message: 'Ok' })
            return
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            response.json({ message: 'Ok' })
            return
        } catch (error) {
            next(error)
        }
    }
}
