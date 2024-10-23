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

interface SenjaTestimonialRequest {
  senjaApiKey: string;
  adpListReviews: any[];
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

app.post('/api/senja-testimonial', async (req: Request<{}, {}, SenjaTestimonialRequest>, res: Response) => {
  const { senjaApiKey, adpListReviews } = req.body;

  try {
    const results = await Promise.all(adpListReviews.map(async (review) => {
      const testimonialData = {
        type: "text",
        title: `Mentorship Call with ${review.mentor.name}`,
        text: review.review,
        rating: review.rating,
        url: review.swag_image_url,
        date: review.date_reviewed,
        approved: true,
        thumbnail_url: "",
        customer_name: review.reviewed_by.name,
        customer_company: review.reviewed_by.employer,
        customer_avatar: review.reviewed_by.profile_photo_url,
      };

      const response = await axios.post('https://api.senja.io/v1/testimonials', testimonialData, {
        headers: {
          'Authorization': `Bearer ${senjaApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    }));

    res.json(results);
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
