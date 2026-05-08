const express = require('express');
const users = require('./samples.json')
const app = express();
const fs = require('fs');
const cors = require('cors');
app.use(express.json());
const port = 8000;

app.use(
  cors({origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

app.get('/users', (req, res) => {
  return res.json(users);
});

app.delete('/users/:id', (req, res) => {
  let id = Number(req.params.id);
  const filteredUsers = users.filter((user) => user.id !== id);
  users.splice(0, users.length, ...filteredUsers);
  fs.writeFile('./samples.json', JSON.stringify(filteredUsers), (err) => {
    if (err) return res.status(500).json({ error: 'Could not delete user' });
    return res.json({ message: 'User deleted successfully' });
  });
});

app.post('/users', (req, res) => {
  const { name, age, email } = req.body;
  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }
  let id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {id, name, age, email};
  users.push(newUser);
  fs.writeFile('./samples.json', JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ error: 'Could not save user' });
    return res.json(newUser);
  });
});

app.patch('/users/:id', (req, res) => {
  const { name, age, email } = req.body;
  const id = Number(req.params.id);
  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }
  let index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const updatedUser = {id, name, age, email};
  users.splice(index, 1, updatedUser);

  fs.writeFile('./samples.json', JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ error: 'Could not update user' });
    return res.json(updatedUser);
  });
});

app.listen(port, (err) => {
  console.log(`Server is running on http://localhost:${port}`);
});