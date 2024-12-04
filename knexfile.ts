export default {
    client: 'sqlite3',
    connection: {
        filename: './src/database/database.db',
    },
    pool: {
        afterCreate: (connection: any, done: any) => {
            connection.run('PRAGMA foreign_keys = ON', () => {})
            done()
        },
    },
    useNullAsDefault: true,
    migrations: {
        extensions: 'ts',
        directory: './src/database/migrations',
    },
    seed: {
        extensions: 'ts',
        directory: './src/database/seeds',
    },
}
