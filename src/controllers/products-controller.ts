import { knex } from '@/database/knex'
import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class ProductController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const products = await knex('products').select(
                'id',
                'name',
                'price',
            )

            const total = products.length

            response.json({ total, products })
            return
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                name: z.string().trim(),
                price: z.number().gt(0),
            })

            const { name, price } = requestBodySchema.parse(request.body)
            const id = randomUUID()

            await knex('products').insert({ id, name, price })

            response
                .status(201)
                .json({ message: 'Produto criado com sucesso', id })
            return
        } catch (error) {
            next(error)
        }
    }

    async listById(request: Request, response: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.string().uuid(),
            })

            const { id } = requestParamSchema.parse(request.params)

            const product = await knex('products')
                .where({ id })
                .select('name', 'price')

            response.json({ product })
            return
        } catch (error) {
            next(error)
        }
    }
}
