const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

app.get('/items', (req, res) => {
  res.json(data);
});

app.post('/items', (req, res) => {
  data.push(req.body);
  res.status(201).json(req.body);
});

app.put('/items/:id', (req, res) => {
  const item = data.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const item = data.find(item => item.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  data = data.filter(item => item.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
