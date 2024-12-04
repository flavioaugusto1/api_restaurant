import { knex } from '@/database/knex'
import { AppError } from '@/utils/app-error'
import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class ProductController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query

            const products = await knex('products')
                .select('id', 'name', 'price')
                .whereLike('name', `%${name ?? ''}%`)

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
                .first()

            if (!product) {
                throw new AppError('Produto não encontrado', 404)
            }

            response.json({ product })
            return
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z.string().uuid().trim().parse(request.params.id)

            const requestBodySchema = z.object({
                name: z.string().trim(),
                price: z.number().gt(0),
            })

            const { name, price } = requestBodySchema.parse(request.body)

            const product = await knex('products')
                .where({ id })
                .select('name', 'price')
                .first()

            if (!product) {
                throw new AppError('Produto não encontrado', 404)
            }

            await knex('products')
                .update({ name, price, updated_at: knex.fn.now() })
                .where({ id })

            response.json()
            return
        } catch (error) {
            next(error)
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.string().uuid(),
            })

            const { id } = requestParamSchema.parse(request.params)

            const product = await knex('products')
                .select()
                .where({ id })
                .first()

            if (!product) {
                throw new AppError('Produto não encontrado', 404)
            }

            await knex('products').delete().where({ id })

            response.status(204).send()
            return
        } catch (error) {
            next(error)
        }
    }
}
