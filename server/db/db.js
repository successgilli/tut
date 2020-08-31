import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  password: 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


export default (query, arr=[]) => {
    return pool.query(query, arr);
};
