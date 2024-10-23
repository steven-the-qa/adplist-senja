import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const { userId } = JSON.parse(event.body || '{}');

  if (!userId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'User ID is required' }) };
  }

  try {
    const response = await axios.get(`https://api2.adplist.org/core/review/?user_id=${userId}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching review:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching the review' }),
    };
  }
};
