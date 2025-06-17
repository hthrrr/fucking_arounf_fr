const express = require('express');
const app = express();
const port = 3000;

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

app.post('/api/add', (req, res) => {
  res.json({ message: `Hello, ${req.body.name}!` });
})

// app.use((req, res) => {
//   console.log("404")
//   res.status(404).sendFile('../frontend/public/404.html')
// })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});