import express from 'express';
const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Data Dummy Awal (Resource: Buku)
let dataBuku = [
  { id: "B001", judul: "Pemrograman Web", pengarang: "Andi", tahun: 2021 },
  { id: "B002", judul: "Belajar Express.js", pengarang: "Budi", tahun: 2022 },
  { id: "B003", judul: "Panduan Docker", pengarang: "Cici", tahun: 2023 },
  { id: "B004", judul: "Arsitektur Microservices", pengarang: "Dedi", tahun: 2020 },
  { id: "B005", judul: "Dasar Interoperabilitas", pengarang: "Eka", tahun: 2024 }
];

// 1. GET ALL - Menampilkan seluruh data
app.get('/buku', (req, res) => {
  res.status(200).json(dataBuku);
});

// 2. GET BY ID - Menampilkan data berdasarkan ID
app.get('/buku/:id', (req, res) => {
  const { id } = req.params;
  const buku = dataBuku.find(b => b.id === id);

  if (!buku) {
    return res.status(404).json({ message: "Data buku tidak ditemukan" });
  }

  res.status(200).json(buku);
});

// 3. POST - Menambahkan data baru
app.post('/buku', (req, res) => {
  const { id, judul, pengarang, tahun } = req.body;

  if (!id || !judul) {
    return res.status(400).json({ message: "ID dan Judul wajib diisi" });
  }

  const bukuBaru = { id, judul, pengarang, tahun };
  dataBuku.push(bukuBaru);

  res.status(201).json({
    message: "Data buku berhasil ditambahkan",
    data: bukuBaru
  });
});

// 4. PATCH - Mengubah data sebagian berdasarkan ID
app.patch('/buku/:id', (req, res) => {
  const { id } = req.params;
  const index = dataBuku.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data buku tidak ditemukan" });
  }

  // Menggabungkan data lama dengan update baru
  dataBuku[index] = { ...dataBuku[index], ...req.body };

  res.status(200).json({
    message: "Data buku berhasil diperbarui",
    data: dataBuku[index]
  });
});

// 5. DELETE - Menghapus data berdasarkan ID
app.delete('/buku/:id', (req, res) => {
  const { id } = req.params;
  const index = dataBuku.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data buku tidak ditemukan" });
  }

  const deletedItem = dataBuku.splice(index, 1);

  res.status(200).json({
    message: "Data buku berhasil dihapus",
    data: deletedItem[0]
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server HTTP berhasil berjalan di http://localhost:${PORT}`);
});