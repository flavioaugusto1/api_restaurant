import { knex } from '@/database/knex'
import { Request, Response, NextFunction } from 'express'

export class TablesController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tables = await knex('tables').select('id', 'table_number')

            response.json({ tables })
            return
        } catch (error) {
            next(error)
        }
    }
}
