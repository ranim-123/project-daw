# AR Shop Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

### Option 1: Backend serving Frontend (Recommended)

1. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

2. Copy your frontend assets to the backend:
   ```
   # Copy CSS files
   cp -r style-main.css backend/src/public/css/
   
   # Copy JavaScript files
   cp -r project-daw.js search.js backend/src/public/js/
   
   # Copy images
   mkdir -p backend/src/public/images
   cp -r image-daw/* backend/src/public/images/
   ```

3. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Option 2: Separate Frontend and Backend

1. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

2. Install live-server for the frontend:
   ```
   npm install -g live-server
   ```

3. Install the run-dev script dependencies:
   ```
   npm install
   ```

4. Run both servers with the script:
   ```
   node run-dev.js
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5500
   ```

## Project Structure

- `/backend` - Express.js backend
  - `/src` - Server code
    - `/public` - Static assets (CSS, JS, images)
  - `/views` - EJS templates
- `/` - Frontend files (HTML, CSS, JS)

## Development

- Backend changes: Edit files in the `backend` directory
- Frontend changes: Edit HTML files in the root directory or EJS templates in `backend/views`
- CSS/JS changes: Edit files in their respective directories

## API Endpoints

- `GET /api/products` - Get all products or filter by category
- `POST /api/cart` - Add item to cart
- `POST /api/search` - Search products