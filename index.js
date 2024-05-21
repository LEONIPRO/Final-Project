const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'rootUser',
    port: 5432,
});

client.connect();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.get('/', (req, res) => {
    res.json({ info: 'Names of the games that you can see in this class' });
});

app.options('/games', cors());

app.post('/games', cors(corsOptions), async (req, res) => {
    const { title, category } = req.body;

    if (title && category) {
        try {
            const result = await client.query(
            'INSERT INTO games(title, category) VALUES($1, $2) RETURNING *',
            [title, category]
    );
        res.json(result.rows[0]);
        } catch (error) {
            console.error('Error adding game:', error);
            res.status(500).send('Error adding game! Game needs a title and a category');
    }
    } else {
        res.status(400).send('Error adding game! Game needs a title and a category');
}
});

app.get('/games', cors(), async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games!');
}
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
