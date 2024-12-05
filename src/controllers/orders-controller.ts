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

            await knex('orders').insert({
                id: crypto.randomUUID(),
                product_id,
                table_session_id,
                price: product.price,
                quantity,
            })

            response.status(201).json()
            return
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const table_session_id = z
                .string()
                .uuid()
                .parse(request.params.table_session_id)

            console.log(table_session_id)

            const order = await knex('orders')
                .select(
                    'orders.id',
                    'orders.table_session_id',
                    'orders.product_id',
                    'products.name',
                    'orders.quantity',
                    knex.raw('(orders.price * orders.quantity) AS total'),
                    'orders.created_at',
                    'orders.updated_at',
                )
                .join('products', 'products.id', 'orders.product_id')
                .where({ table_session_id })
                .orderBy('orders.created_at', 'desc')

            response.json({ order })
            return
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const table_session_id = z
                .string()
                .uuid()
                .parse(request.params.table_session_id)

            const order = await knex('orders')
                .select(
                    knex.raw(
                        'COALESCE(SUM(orders.price * orders.quantity), 0) AS total',
                    ),
                    knex.raw('COALESCE((orders.quantity), 0) AS quantity'),
                )
                .where({ table_session_id })
                .first()

            response.json({ order })
            return
        } catch (error) {
            next(error)
        }
    }
}
