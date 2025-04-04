import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'Fluffy',
    birthdate: '2020-01-01',
    weight: 10,
    owner: 'John Doe',
    image: 'https://loremflickr.com/320/240/cat'
  };
  res.json(cat);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
