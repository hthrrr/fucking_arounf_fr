const express = require('express');
const { connectDB } = require('./config/db');
const Task = require('./models/tasks.schema.js');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const path = require('path');
const router = require('./routes/product.routes.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') })

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

// app.use("/api", router)

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
  const task = req.body
  console.log("the name is" + req.body.itemName)
  console.log("the quantity is" + req.body.itemQuantity)

  if (!task.itemName || !task.itemQuantity) {
    return res.status(400).json({ error: 'provide all fields' });
  }

  const newTask = new Task(task)
  newTask.save()
  .then(() => {
    res.status(201).json({ message: 'Task added successfully' });
  })
  .catch(err => {
    res.status(500).json({ error: 'Failed to add task' });
  });

})

// app.use((req, res) => {
//   console.log("404")
//   res.status(404).sendFile('../frontend/public/404.html')
// })

app.listen(port, () => {
  connectDB()
  console.log(`Server running at http://localhost:${port}`);
});