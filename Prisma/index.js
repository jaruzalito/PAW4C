const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));