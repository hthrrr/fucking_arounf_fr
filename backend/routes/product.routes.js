const express = require('express')

const router = express.Router()


router.post('/api/submit', (req, res) => {
  const { name } = req.body;
  console.log(`Received name: ${name}`);
  res.json({ message: `Hello, ${name}!` });
});

//add task to db
router.post('/api/tasks', (req, res) => {
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

module.exports = router