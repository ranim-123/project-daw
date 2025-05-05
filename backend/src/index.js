import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample product data
const products = {
  shoes: [
    { id: 1, name: 'Air Huarache RUN', description: 'collection 2023(nouvelle arrivage)', price: 99.99, image: '/images/shoes5.png' },
    { id: 2, name: 'NIKE AIR ZOOM', description: 'dark blue shoes', price: 149.99, image: '/images/shoes3.png' },
    { id: 3, name: 'NIKE FREE RUNNING', description: 'white yallow shoes', price: 74.99, image: '/images/shoes6.png' },
    { id: 4, name: 'NIKE ZOOM KOBE IX 9', description: 'black yallow shoes', price: 199.99, image: '/images/shoes1.png' }
  ],
  tshirts: [
    { id: 5, name: 't-shirt slim', description: 'Nouvelle collection slim fit', price: 14.99, image: '/images/t-shirt1-removebg-preview.png' },
    { id: 6, name: 'black slim t-shirt', description: 'Nouvelle collection slim fit (arrivage 2022)', price: 15.99, image: '/images/t-shirt2-removebg-preview.png' },
    { id: 7, name: 'sport t-shirt (black)', description: 'simple black t-shirt', price: 19.99, image: '/images/t-shirt3-removebg-preview.png' },
    { id: 8, name: 'RED T-SHIRT (slim fit)', description: 'nouveau design of t-shirt (2024)', price: 24.99, image: '/images/t-shirt4-removebg-preview.png' }
  ],
  dresses: [
    { id: 9, name: 'gris DRESS (classic)', description: 'The best DRESS in the season 2023 - 2024', price: 199.99, image: '/images/dresse1-removebg-preview.png' },
    { id: 10, name: 'pransees dress (slim fit)', description: 'DREESS slim fit (arrivage 2022)', price: 299.99, image: '/images/dresse2-removebg-preview.png' },
    { id: 11, name: 'RED DRESS (slim fit)', description: 'The Beutiful DRESS in the year 2025', price: 399.99, image: '/images/dresse3-removebg-preview.png' },
    { id: 12, name: 'black DRESS (classic)', description: 'DRESS in the WEDDINGS', price: 499.99, image: '/images/dresse4-removebg-preview.png' }
  ]
};

// Routes
app.get('/', (req, res) => {
   return res.status(200).json(products);
});


// API endpoints
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  if (category && products[category]) {
    res.json(products[category]);
  } else {
    // Return all products if no category specified
    const allProducts = [
      ...products.shoes,
      ...products.tshirts,
      ...products.dresses
    ];
    res.json(allProducts);
  }
});

app.post('/api/cart', (req, res) => {
  // In a real app, you would save this to a database
  console.log('Added to cart:', req.body);
  res.json({ success: true });
});

app.post('/api/search', (req, res) => {
  const searchTerm = req.body.term.toLowerCase();
  const allProducts = [
    ...products.shoes,
    ...products.tshirts,
    ...products.dresses
  ];
  
  const results = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
  
  res.json(results);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the site`);
});
