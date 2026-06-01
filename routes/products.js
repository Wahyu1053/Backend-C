const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const products = db.queryAll('SELECT * FROM products ORDER BY id ASC');
  res.json({
    status: 'success',
    data: products
  });
});

router.post('/', (req, res) => {
  const { name, price, stock, category } = req.body;

  if (!name || price == null || stock == null || !category) {
    return res.status(400).json({
      status: 'error',
      message: 'Field name, price, stock, dan category wajib diisi'
    });
  }

  if (typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Field price dan stock harus berupa angka'
    });
  }

  db.run(
    'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)',
    [name, price, stock, category]
  );

  const { id: newId } = db.queryGet('SELECT MAX(id) AS id FROM products');
  const newProduct = db.queryGet('SELECT * FROM products WHERE id = ?', [newId]);

  res.status(201).json({
    status: 'success',
    data: newProduct
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;

  const existing = db.queryGet('SELECT * FROM products WHERE id = ?', [id]);
  if (!existing) {
    return res.status(404).json({
      status: 'error',
      message: `Produk dengan id ${id} tidak ditemukan`
    });
  }

  const updated = {
    name: name ?? existing.name,
    price: price ?? existing.price,
    stock: stock ?? existing.stock,
    category: category ?? existing.category
  };

  db.run(
    'UPDATE products SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?',
    [updated.name, updated.price, updated.stock, updated.category, id]
  );

  const product = db.queryGet('SELECT * FROM products WHERE id = ?', [id]);

  res.json({
    status: 'success',
    data: product
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const existing = db.queryGet('SELECT * FROM products WHERE id = ?', [id]);
  if (!existing) {
    return res.status(404).json({
      status: 'error',
      message: `Produk dengan id ${id} tidak ditemukan`
    });
  }

  db.run('DELETE FROM products WHERE id = ?', [id]);

  res.json({
    status: 'success',
    message: `Produk dengan id ${id} berhasil dihapus`
  });
});

module.exports = router;
