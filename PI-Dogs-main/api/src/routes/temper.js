const { Router } = require('express');
const { getTempers } = require('../mw/mw');
const axios = require('axios');
const {Temper, Breed} = require ('../db');
const { YOUR_API_KEY } = process.env


const router = Router();

// Traigo todos los temperamentos
router.get('/', async(req, res, next)=>{
    try{
        const temperApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        const tempers = temperApi.data.map(t=>t.temperament).toString().split(/\s*,\s*/);
    
        tempers.forEach(t=>{
            Temper.findOrCreate({
                where: {name: t},
            })
        })
    
        const allTempers = await Temper.findAll();


        res.json(allTempers);
        
    } catch(error){
        next(error);
    }
})

module.exports = router;
