const express = require("express");
const { PrismaClient } = require('@prisma/client')
const router = express.Router();
const prisma = new PrismaClient()

router.post('/', async(req, res) => {
    const { tekstWpisu, tytul, idKategoria} = req.body;
    try{
        const newWpis = await prisma.wpis.create({
            data:{
                tekstWpisu,
                tytul,
                idKategoria,
            }
        })
        res.status(201).send(newWpis);
    }catch(err){
        res.status(500).json({error: err});
    }
})

router.get('/', async(req, res) => {
    try {
        const wpisy = await prisma.wpis.findMany({
            include: {kategoria: true, komentarz: true}
        })
        res.json(wpisy);
    }catch (err){
        res.status(500).json({error: err});
    }
})

router.get('/:id', async(req, res) => {
    const {id} =req.params;
    try{
        const wpis = await prisma.wpis.findUnique({
            where: {id: Number(id)},
            include: {kategoria: true, komentarz: true},
        })
        res.json(wpis);
    }catch (error){
        res.status(404).json({error: error});
    }
})

router.put('/:id', async(req, res) => {
    const {id} = req.params;
    const {tekstWpisu, tytul, idKategoria} = req.body;
    try{
        const updatedWpis = await prisma.wpis.update({
            where: {id: Number(id)},
            data: {tekstWpisu, tytul, idKategoria},
        })
        res.json(updatedWpis)
    }catch (error){
        res.status(404).json({error: error});
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        await prisma.wpis.delete({
            where: {id: Number(id)},
        })
        res.status(201).send('Deleted');
    }catch (error){
        res.status(500).json({error: error});
    }
})

module.exports = router;