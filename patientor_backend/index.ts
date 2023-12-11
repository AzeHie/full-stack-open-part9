import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('ping ping');
  res.send('pong pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});