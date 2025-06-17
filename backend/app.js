const express = require('express');
const { connectDB } = require('./config/db');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use(express.static('../frontend/public')); // Serve static files from public/
app.use('/nested',express.static('nested')); // Serve static files from nested/

app.use(express.json());           // Parse JSON bodies

app.post('/api/submit', (req, res) => {
  const { name } = req.body;
  console.log(`Received name: ${name}`);
  res.json({ message: `Hello, ${name}!` });
});

//add task to db
app.post('/api/tasks', (req, res) => {
  res.json({ message: `Hello, ${req.body.name}!` });
})

// app.use((req, res) => {
//   console.log("404")
//   res.status(404).sendFile('../frontend/public/404.html')
// })

app.listen(port, () => {
  connectDB()
  console.log(`Server running at http://localhost:${port}`);
});