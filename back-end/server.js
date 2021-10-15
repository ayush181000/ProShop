const { match } = require('assert');
const express = require('express');
const products = require('./data/products');
const app = express();

app.get('/', (req, res) => {
  res.send('server running');
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log('Server runnning on port 5000'));
