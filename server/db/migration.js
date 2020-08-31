import db from './db';

const todo = `
    CREATE TABLE if not exists todo(
        id SERIAL PRIMARY KEY,
        name text
    )
`;

db(todo);
