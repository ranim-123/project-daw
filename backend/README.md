# AR Shop Backend

This is a simple Express.js backend for the AR Shop e-commerce website.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Features

- EJS templating for dynamic content
- Product catalog with categories
- Shopping cart functionality
- Search functionality
- Admin panel (basic implementation)

## Project Structure

- `/src` - Server code
  - `/public` - Static assets (CSS, JS, images)
- `/views` - EJS templates
  - `/pages` - Full page templates
  - `/partials` - Reusable template parts

## API Endpoints

- `GET /api/products` - Get all products or filter by category
- `POST /api/cart` - Add item to cart
- `POST /api/search` - Search products