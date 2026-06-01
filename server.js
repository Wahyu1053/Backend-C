const express = require('express');
const { initDb } = require('./db');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Products REST API',
    endpoints: {
      list: 'GET /api/products',
      create: 'POST /api/products',
      update: 'PUT /api/products/:id',
      delete: 'DELETE /api/products/:id'
    }
  });
});

app.use('/api/products', productsRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
});
