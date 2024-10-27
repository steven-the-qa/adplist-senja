import { Handler } from '@netlify/functions'
import axios from 'axios'

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405 }
    }

    const { profileUrl } = event.queryStringParameters || {};

    if (!profileUrl) {
        return { statusCode: 400 }
    }

    const mentorSlug = profileUrl.split('/').pop();
    const response = await axios.get(`https://api.adplist.org/users/profile/mentor/${mentorSlug}`);
    return { statusCode: 200, body: JSON.stringify(response.data) }
}
