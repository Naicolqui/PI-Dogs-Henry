const { default: axios } = require('axios');
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
            if (breedExists.length>0) res.json(breedExists);
            if(breedExists.length<1) res.send([{
                name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperaments: 'Puede crearla en nuestro "Creador de Perros"', image: 'https://thumbs.dreamstime.com/b/perro-con-una-lupa-75331469.jpg'
            }]);
        }
        if(!name){
            allInfo.length ? res.json(allInfo) : res.send({msg: 'No se recibió información'})
        }
    } catch(error){
        next(error);
    }
});

router.post('/create', async (req, res, next)=>{
    const {name, highMin, highMax, weightMin, weightMax, life_span, image, tempers} = req.body;
    if(!name || !highMin || !highMax || !weightMin ||!weightMax){return res.status(400).json({msg: "Falta información"})}
    if(typeof name !== "string" || typeof highMin !== "string" || typeof highMax !== "string" || typeof weightMax !== "string" || typeof weightMin !== "string" ){return res.status(400).json({msj: "Alguno de los datos no fue introducido correctamente"})}
    if(parseInt(highMin)>parseInt(highMax)){return res.status(400).json({msg:'La autra mínima no puede ser mayor a la máxima'})}
    if(parseInt(weightMin)>parseInt(weightMax)){return res.status(400).json({msg:'El peso mínimo no puede ser mayor al peso máximo'})}
    try {
        const newBreed = await Breed.create({
            name,
            highMin,
            highMax,
            weightMin,
            weightMax,
            life_span,
            image
        })

        let temperDB = await Temper.findAll({
            where: {
                name: tempers,
            }
        })

        await newBreed.addTempers(temperDB)

        //console.log(newBreed.tempers)
        // console.log(newBreed)
        // console.log(temperDB)
        res.status(200).send("La raza fue creada correctamente")
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



module.exports = router;



















//FORMULARIO

// select para los talles
// input para el stock

//-------<button>Agregar más talles</button>

const handleStock = (e)=>{
    axios.post("ruta del post")
}

const handleRelation = (e)=>{
    axios.get("ruta del producto", id)
}


//     {
//         "name": "Pesas rusas",
//         "description": "Encontrá estas pesas en nuestro local o compralas por nuestra tienda virtual.",
//         "price": 3000,
//         "stock": 83,
//         "rating": 5,
//         "size": "3g, 4kg, 5g",
//         "color": "Aleatorio",
//         "image": "https://i.pinimg.com/originals/90/f8/35/90f8358aa8f86ec0c4653eee76e7f94b.jpg",
//         "categories": [
//             {
//                 "name": "Accesorios"
//             }
//         ]
//     },

//     {
//         "name": "Remeras Levis",
//         "description": "Encontrá estas remeras hermosas en nuestro local o compralas por nuestra tienda virtual.",
//         "price": 2500,
//         "stock": 72,
//         "rating": 5,
//         "size": "l, xxl",
//         "color": "Gris, Blanco",
//         "image": "https://i.pinimg.com/564x/24/92/27/249227305c7ad2100d6035f4fdb2d43b.jpg",
//         "categories": [
//             {
//                 "name": "Indumentaria de hombre"
//             },
//             {
//                 "name": "Remeras"
//             }
//         ]
//     },

//     {
//         "name": "Vinchas",
//         "description": "Encontrá estas vinchas para deporte en nuestro local o compralas por nuestra tienda virtual.",
//         "price": 1500,
//         "stock": 180,
//         "rating": 4,
//         "size": "Único",
//         "color": "Violeta, Rosa, Negro, Celeste",
//         "image": "https://i.pinimg.com/564x/66/10/dd/6610dd1e944693d0dbb03c41e092f67b.jpg",
//         "categories": [
//             {
//                 "name": "Accesorios"
//             }
//         ]
//     },

//     {
//         "name": "Sudadera Adidas",
//         "description": "Encontrá estas sudaderas hermosas en nuestro local o compralas por nuestra tienda virtual.",
//         "price": 2000,
//         "stock": 64,
//         "rating": 5,
//         "size": "m, l, xl",
//         "color": "Amarillo, Rosa",
//         "image": "https://i.pinimg.com/564x/f2/14/0e/f2140e597cfd4b4bfce2edffc939d862.jpg",
//         "categories": [
//             {
//                 "name": "Indumentaria de mujer"
//             },
//             {
//                 "name": "Remeras"
//             }
//         ]
//     }

// ]



// values:
// en el front: 
//size_stock: "xl - 45"

//let map = .map(e => e.size_stock)

// map[i].split(/\s*-\s*/)