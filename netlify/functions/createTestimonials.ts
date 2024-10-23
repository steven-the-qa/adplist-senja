import { Handler } from '@netlify/functions'
import axios from 'axios'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { senjaApiKey, adpListReviews } = JSON.parse(event.body || '{}')

  if (!senjaApiKey || !adpListReviews) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Senja API Key and ADPList reviews are required' }) }
  }

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
      }

      const response = await axios.post('https://api.senja.io/v1/testimonials', testimonialData, {
        headers: {
          'Authorization': `Bearer ${senjaApiKey}`,
          'Content-Type': 'application/json',
        },
      })

      return response.data
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(`Successfully created ${adpListReviews.length} Senja testimonials!`)
    }
  } catch (error) {
    console.error('Error creating testimonials:', error)
    return {
      statusCode: 500,
      body: JSON.stringify('An error occurred while creating the testimonials')
    }
  }
}
