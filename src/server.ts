import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

interface ADPListReviewRequest {
  userId: string;
}

app.post('/api/adplist-review', async (req: Request<{}, {}, ADPListReviewRequest>, res: Response) => {
  const { userId } = req.body;

  try {
    const response = await axios.get(`https://api2.adplist.org/core/review/?user_id=${userId}`);
    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
