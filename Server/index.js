import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Use cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Serve static files (images)


app.get('/api/feed', async (req, res) => {
  try {
    // Reading JSON File
    const filePath = join(__dirname, 'data', 'feed.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    // Extracting feeds based on the specified limit
    const limit = parseInt(req.query.limit) || 5;
    const slicedData = jsonData.slice(0, limit);

    res.status(200).json(slicedData);
  } catch (error) {
    // Error Handling
    console.error('Error reading feed.json:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});
app.use( express.static(join(__dirname, 'assets')));
// Example: Start the Express app on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
