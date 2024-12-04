import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('tables').del()

    // Inserts seed entries
    await knex('tables').insert([
        { id: crypto.randomUUID(), table_number: 1 },
        { id: crypto.randomUUID(), table_number: 2 },
        { id: crypto.randomUUID(), table_number: 3 },
    ])
}
