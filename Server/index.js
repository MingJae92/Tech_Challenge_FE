import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(join(__dirname, 'assets')));

app.listen(4000, function (err) {
  if (err) return err;
  console.log('(HTTP) App now running on port', 4000);
});
