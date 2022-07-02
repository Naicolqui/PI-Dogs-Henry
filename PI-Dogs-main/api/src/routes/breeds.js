const { Router } = require('express');
const {Temper, Breed} = require ('../db');
// const axios = require('axios');
const { filteredApiBreeds, DbBreeds} = require('../mw/mw');
// const Tempers = require('../models/Temper');

const router = Router();

// Configurar los routers
//Ruta get para traer toda la info o por nombre segun query
router.get('/', async(req, res, next)=>{
    try{
        const name = req.query.name;
        const api = await filteredApiBreeds();
        const db = await DbBreeds();
        const allInfo = api.concat(db);
        if(name){
            let breedExists = await allInfo.filter(b=> b.name.toLowerCase().includes(name.toLowerCase()));
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
    const {name, high, weightMin, weightMax, life_span, image, tempers} = req.body;
    if(!name || !high || !weightMin ||!weightMax){return res.status(400).json({msg: "Falta información"})}
    if(typeof name !== "string" || typeof high !== "string" || typeof weightMax !== "string" || typeof weightMin !== "string" ){return res.status(400).json({msj: "Alguno de los datos no fue introducido correctamente"})}
    try {
        const newBreed = await Breed.create({
            name,
            high,
            weightMin,
            weightMax,
            life_span,
            image,
            tempers
        })

        let temperDB = await Temper.findAll({
            where: {
                name: tempers,
            }
        })

        await newBreed.addTempers(temperDB)
        // console.log(newBreed)
        // console.log(temperDB)
        res.status(200).send("ok")
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

// router.post('/:idBreed/temper/:idTemper', async (req, res, next)=>{
//     try{
//         const {idBreed, idTemper} = req.params;
//         const breed = await Breed.findByPk(idBreed);
//         await breed.addTemper(idTemper);
//         res.send(200);
//     } catch(error){
//         next(error);
//     }
// });


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
