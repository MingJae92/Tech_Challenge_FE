// server.js
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Use cors middleware to enable Cross-Origin Resource Sharing.
app.use(cors());

// Serve static files (images)
app.use(express.static(join(__dirname, 'assets')));

// Helper function to read data from the specified file.
const readDataFromFile = async (fileName) => {
  const filePath = join(__dirname, 'data', fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

app.get('/api/feed', async (req, res) => {
  try {
    // Extracting feeds based on the specified limit and offset.
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    // Read the entire feed data
    const jsonData = await readDataFromFile('feed.json');

    // Extract the slice based on limit and offset.
    const slicedData = jsonData.slice(offset, offset + limit);

    res.status(200).json(slicedData);
  } catch (error) {
    console.error('Error reading feed.json:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/api/comments/:briefref', async (req, res) => {
  try {
    const briefref = req.params.briefref;

    // Read the comments data.
    const commentsData = await readDataFromFile('comments.json');

    // Filter comments based on the briefref
    const filteredComments = commentsData.filter((comment) => comment.briefref === briefref);

    res.status(200).json(filteredComments);
  } catch (error) {
    console.error('Error reading comments.json:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Example: Start the Express app on port 4000.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
