import Knex from 'knex'

declare module 'knex/types/tables' {
    interface Tables {
        products: {
            id: string
            name: string
            price: number
            updated_at: Date
        }
    }
}
