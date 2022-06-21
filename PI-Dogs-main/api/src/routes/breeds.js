const { Router } = require('express');
const {Temper, Breed} = require ('../db');
const axios = require('axios');
const { filteredApiBreeds, DbBreeds} = require('../mw/mw');


const router = Router();

// Configurar los routers
//Ruta get para traer toda la info o por nombre segun query
router.get('/', async(req, res, next)=>{
    try{
        const {name} = req.query;
        const api = await filteredApiBreeds();
        const db = await DbBreeds();
        const allInfo = api.concat(db);
        if(name){
            let breedExists = allInfo.find((b)=>b.name === name);
            if (breedExists) res.json(breedExists);
        }
        if(!name){
            res.json(allInfo);
        }
    } catch(error){
        next(error);
    }
});

router.post('/create', async (req, res, next)=>{
    try {
        const {name, high, weight, life_span, image} = req.body;
        const newBreed = await Breed.create({
            name,
            high,
            weight,
            life_span,
            image
        })
        res.status(201).send(newBreed);
    } catch(error){
        next(error)
    }
});

router.get('/:id', async(req, res, next)=>{
    try{
        const {id} = req.params;
        const api = await filteredApiBreeds();
        const db = await DbBreeds();
        const allInfo = api.concat(db);
        if (id) {
            const filtered = await allInfo.filter((e) => e.id == id);
            res.json(filtered);
          }
    }
    catch(error){
        next(error);
    }
});

//---------------------------------Relación entre razas y temperamento --------------------------------------

router.post('/:idBreed/types/:idTemper', async (req, res, next)=>{
    try{
        const {idBreed, idTemper} = req.params;
        const breed = await Breed.findByPk(idBreed);
        await breed.addType(idTemper);
        res.send(200);
    } catch(error){
        next(error);
    }
});


//Ruta de delete
// router.delete("/:id", async function (req, res) {
//     const { id } = req.params;
//     try {
//       if (id) {
//         await Race.destroy({
//           where: { id: id },
//         });
//         res.send({ msg: "Dog deleted" });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });

module.exports = router;
