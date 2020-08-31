import db from './db';

export default {
    addTask: async (task) => {
        try {
            const query = 'insert into todo(name) values($1) returning *'
            const res = await db(query, [task]);
            const { rows } = res;

            return rows[0];
        } catch (err) {
            console.log(err);
        }
    },
    getAll: async () => {
        try {
            const query = 'select * from todo order by id desc';
            const res = await db(query);

            const { rows } = res;

            return rows;
        } catch (err) {
            console.log(err);
        }
    },
    deleteTask: async (id) => {
        const query = 'delete from todo where id=$1';
        await db(query, [id]);
    }
};
