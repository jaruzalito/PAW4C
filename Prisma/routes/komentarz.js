const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new Komentarz
router.post('/', async (req, res) => {
    const { zawartosc, idWpis } = req.body;
    try {
        const newKomentarz = await prisma.komentarz.create({
            data: { zawartosc, idWpis },
        });
        res.status(201).json(newKomentarz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all Komentarz
router.get('/', async (req, res) => {
    try {
        const komentarze = await prisma.komentarz.findMany({ include: { wpis: true } });
        res.json(komentarze);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Komentarz by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { zawartosc } = req.body;
    try {
        const updatedKomentarz = await prisma.komentarz.update({
            where: { id: Number(id) },
            data: { zawartosc },
        });
        res.json(updatedKomentarz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Komentarz by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.komentarz.delete({ where: { id: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
