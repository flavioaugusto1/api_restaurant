import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('products').del()

    // Inserts seed entries
    await knex('products').insert([
        { id: crypto.randomUUID(), name: 'Macarrão', price: 8.9 },
        { id: crypto.randomUUID(), name: 'Arroz', price: 5.9 },
        { id: crypto.randomUUID(), name: 'Carne', price: 20.55 },
    ])
}
