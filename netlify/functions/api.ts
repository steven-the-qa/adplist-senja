import { Handler } from '@netlify/functions'
import axios from 'axios'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { userId, senjaApiKey } = JSON.parse(event.body || '{}')

  if (!userId || !senjaApiKey) {
    return { statusCode: 400, body: 'User ID and Senja API Key are required' }
  }

  try {
    // Fetch ADPList review
    const adpListResponse = await axios.get(`https://api2.adplist.org/core/review/?user_id=${userId}`)
    const review = adpListResponse.data

    // Create Senja testimonial
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
    }

    const senjaResponse = await axios.post('https://api.senja.io/v1/testimonials', testimonialData, {
      headers: {
        'Authorization': `Bearer ${senjaApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        adpListReview: review,
        senjaTestimonial: senjaResponse.data
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while processing the request' })
    }
  }
}
