import Knex from 'knex'

declare module 'knex/types/tables' {
    interface Tables {
        products: {
            id: string
            name: string
            price: number
            updated_at: Date
        }
        tables: {
            id: string
            table_number: number
            updated_at: Date
        }
        tables_sessions: {
            id: string
            table_id: string
            opened_at: Date
            closed_at: Date
        }
        orders: {
            id: string
            product_id: string
            table_session_id: string
            quantity: number
            price: number
            created_at: Date
            updated_at: Date
        }
    }
}
