import { knex } from '@/database/knex'
import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                table_session_id: z.string().uuid(),
                product_id: z.string().uuid(),
                quantity: z.number(),
            })

            const { product_id, quantity, table_session_id } =
                requestBodySchema.parse(request.body)

            const session = await knex('tables_sessions')
                .where({
                    id: table_session_id,
                })
                .first()

            if (!session) {
                throw new AppError('This session does not exists', 404)
            }

            if (session.closed_at) {
                throw new AppError('This session is closed', 400)
            }

            const product = await knex('products')
                .where({ id: product_id })
                .first()

            if (!product) {
                throw new AppError('Product does not exists', 404)
            }

            response.status(201).json()
            return
        } catch (error) {
            next(error)
        }
    }
}
