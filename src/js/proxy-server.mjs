import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use('/', async (req, res) => {
  const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json&jsonp=handleQuote';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

export default app;
