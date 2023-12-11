import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('ping ping');
  res.send('pong pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});