const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.use(express.json());

const wpisRouter = require("./routes/wpis");
const kategoriaRouter = require("./routes/kategoria");
const komentarzRouter = require("./routes/komentarz");

app.use('/api/wpis', wpisRouter);
app.use('/api/kategoria', kategoriaRouter);
app.use('/api/komentarz', komentarzRouter);

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));