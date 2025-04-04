import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
