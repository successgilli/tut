import 'regenerator-runtime/runtime';

import path from 'path';
import express from 'express';

import './db/migration.js';
import query from './db/query';

const { addTask, getAll, deleteTask } = query;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const tasks = await getAll();
    console.log(tasks, " ==> hre");
    res.status(200).render('index', { tasks: tasks })
});

app.post('/todo', async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await addTask(name);

        return res.status(200).json({
            data: result,
            status: 200
        });
    } catch (err) {
        next(err);
    }
});

app.delete('/todo/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        deleteTask(id);
        
        return res.status(200).json({
            data: id,
            status: 200
        })
    } catch (err) {
        next(err);
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json('Something broke!')
});

app.listen(5000, () => console.log('listening on 5000'));
