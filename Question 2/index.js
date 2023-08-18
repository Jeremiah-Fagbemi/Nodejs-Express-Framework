const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const inventory = [];
let nextItemId = 1;

app.post('/api/items', (req, res) => {
  const newItem = {
    id: nextItemId++,
    name: req.body.name,
    price: req.body.price,
    size: req.body.size
  };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/items', (req, res) => {
  res.json(inventory);
});

app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = inventory.find(item => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = inventory.findIndex(item => item.id === itemId);
  if (index !== -1) {
    inventory[index] = { ...inventory[index], ...updatedItem };
    res.json(inventory[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = inventory.findIndex(item => item.id === itemId);
  if (index !== -1) {
    const deletedItem = inventory.splice(index, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
