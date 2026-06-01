<<<<<<< HEAD
# Products REST API

REST API sederhana untuk mengelola data produk menggunakan ExpressJS dan SQLite.

## Instalasi

```bash
npm install
```

## Menjalankan Server

```bash
npm start
```

Server berjalan di `http://localhost:3000`.

## Endpoint

| Method | Endpoint              | Deskripsi                              |
|--------|-----------------------|----------------------------------------|
| GET    | /api/products         | Menampilkan semua produk               |
| POST   | /api/products         | Menambah produk baru                   |
| PUT    | /api/products/:id     | Mengupdate data produk berdasarkan ID  |
| DELETE | /api/products/:id     | Menghapus produk berdasarkan ID        |

## Struktur Tabel `products`

| Field    | Tipe    | Keterangan                       |
|----------|---------|----------------------------------|
| id       | INTEGER | Primary Key, Auto Increment      |
| name     | TEXT    | Nama barang                      |
| price    | INTEGER | Harga barang                     |
| stock    | INTEGER | Jumlah stok                      |
| category | TEXT    | Kategori barang                  |

## Contoh Request

### Tambah Produk (POST /api/products)
```json
{
  "name": "Indomie Goreng",
  "price": 3500,
  "stock": 100,
  "category": "Makanan"
}
```

### Update Produk (PUT /api/products/1)
```json
{
  "price": 4000,
  "stock": 80
}
```

## Contoh dengan cURL

```bash
# Tampilkan semua produk
curl http://localhost:3000/api/products

# Tambah produk
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Indomie Goreng","price":3500,"stock":100,"category":"Makanan"}'

# Update produk
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":4000,"stock":80}'

# Hapus produk
curl -X DELETE http://localhost:3000/api/products/1
```
=======
# Backend-C
>>>>>>> 2844630820311c5d8980fc0575da2f4770ae3427
