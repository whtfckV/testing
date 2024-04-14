// const express = require('express');
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
