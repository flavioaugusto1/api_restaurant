import { knex } from '@/database/knex'
import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                table_id: z.string().uuid(),
            })

            const { table_id } = requestBodySchema.parse(request.body)

            await knex('tables_sessions').insert({
                id: crypto.randomUUID(),
                table_id,
            })

            response.status(201).send()
            return
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tableSessions = await await knex('tables_sessions')
                .select()
                .orderBy('closed_at')

            response.json({ tableSessions })
            return
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z.string().uuid().parse(request.params.id)

            const session = await knex('tables_sessions').where({ id }).first()

            if (!session) {
                throw new AppError('Session table not found', 404)
            }

            if (session.closed_at) {
                throw new AppError('This sessions is already closed', 409)
            }

            await knex('tables_sessions')
                .update({ closed_at: knex.fn.now() })
                .where({ id })

            response.status(204).send()
            return
        } catch (error) {
            next(error)
        }
    }
}
