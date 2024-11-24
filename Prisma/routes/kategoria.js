const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const {nazwa} = req.body;
    try{
        const newKategoria = await prisma.kategoria.create({
            data:{nazwa}
        })
        res.json(newKategoria);
    }catch (error){
        res.status(404).json({error: error});
    }
})
router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const Kategoria = await prisma.kategria.findUnique({
            where: {id: Number(id)},
        })
        res.json(Kategoria);
    }catch (error){
        res.status(404).json({error: error});
    }
})
router.get('/', async(req, res) => {
    try{
        const Kategorie = await prisma.kategoria.findMany({
            include: {wpisy:true},
        })
        res.json(Kategorie);
    }catch (error){
        res.status(404).json({error: error});
    }
})

router.put('/:id', async(req, res) => {
    const {id} = req.params;
    const {nazwa} = req.body;
    try{
        const updatedKategoria = await prisma.kategoria.update({
            where: {id: Number(id)},
            data: {nazwa}
        })
        res.json(updatedKategoria);
    }catch (error){
        res.status(404).json({error: error});
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        await prisma.kategoria.delete({where: {id: Number(id)}})
        res.status(204).end()
    }catch (error){
        res.status(404).json({error: error});
    }
})

module.exports = router;