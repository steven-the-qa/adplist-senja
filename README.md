# ADPList to Senja Testimonial Converter

This project automates the process of fetching reviews for an ADPList mentor and converting them into testimonials on Senja.

## How it works

1. Fetches reviews from ADPList for a specific mentor
2. Converts ADPList reviews into Senja-compatible testimonial format
3. Automatically creates testimonials on Senja

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (usually comes with Node.js)

## Setup

1. Clone the repository:   ```
   git clone https://github.com/yourusername/adplist-senja.git
   cd adplist-senja   ```

2. Install dependencies:   ```
   npm install   ```

3. Build the project:   ```
   npm run build   ```

## Usage

To run the project:
```
npm run dev
```

Once the application is running, open your web browser and navigate to `http://localhost:3000` (or the port specified in your console output).

## Notes

Ensure you have API access on Senja before using this tool (API access only comes with a paid plan).

Your ADPList userId can be found in the URL when you are on the mentor's profile page on ADPList.

In the Network tab in Chrome DevTools, find one of these network requests and you'll find your `identity_id` in the request parameters.

### Example:


