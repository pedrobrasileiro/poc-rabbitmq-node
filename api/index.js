'use strict';

import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.NODE_ENV = "local" ? 3001 : 3000;

import { consumer, producer } from './service.js';

app.post('/sendmessage', (req, res) => {
    try {
        producer('hello-queue', JSON.stringify(req.body));

        res.json({
            message: 'queue message.'
        });
    } catch (error) {
        res.send(error);
    }
});

app.get('/process/queue/:queue', (req, res) => {
    try {
        const queueName = req.params.queue;
        consumer(queueName);

        res.json({
            message: `init process queue ${queueName}`
        });
    } catch (error) {
        res.send(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});