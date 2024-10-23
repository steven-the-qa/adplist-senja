# ADPList Review to Senja Testimonial Converter

This project automates the process of fetching reviews for an ADPList mentor and converting them into testimonials on Senja.

## Where to find it

Live site: https://majestic-babka-6bae67.netlify.app/

## How it works

1. Fetch all of your ADPList reviews

2. Create a testimonial on Senja for each review

## What you'll need

- Your ADPList User ID
- Your Senja API key

## Where do I get the API Key and User ID?

- Ensure you have API access on Senja before using this tool. At the time of writing this, Senja API access only comes with a [Pro plan]([url](https://senja.io/pricing)).

- Your ADPList User Id can be found in the URL when you are on your public profile page on ADPList. In the Network tab in Chrome DevTools, find a network request with  `identity_id` in the request parameters. Use the `identity_id` value as your User Id in this tool.

### Example:

![Screenshot 2024-10-23 at 5 47 40 AM](https://github.com/user-attachments/assets/b67d0286-40c5-4606-9d0d-36824dfd869b)

## Local Development

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (usually comes with Node.js)

### Setting up the project

1. Clone the repository:   ```
   git clone https://github.com/yourusername/adplist-senja.git
   cd adplist-senja   ```

2. Install dependencies:   ```
   npm install   ```

3. Build the project:   ```
   npm run build   ```

### Running the dev server

To run the project:
```
npm run dev
```

Once the application is running, open your web browser and navigate to `http://localhost:3000` (or the port specified in your console output).

