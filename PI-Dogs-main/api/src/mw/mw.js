const {Breed, Temper} = require('../db');
const axios = require('axios');
const { YOUR_API_KEY } = process.env

const inicialDbState = [];

//Traigo todas las razas desde la API
const getApiBreeds = async()=>{
    const breeds = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    // console.log("razas", breeds);
    return breeds.data;
}

//Mapeo para que me traiga la info que a mi me interesa
const filteredApiBreeds = async ()=>{
    const breeds = await getApiBreeds();
    const mapedBreeds = await breeds.map((b)=>{
        return{
            id: b.id,
            name: b.name,
            highMin: b.height.metric.split(/\s*-\s*/)[0],
            highMax: b.height.metric.split(/\s*-\s*/)[1],
            // weight: b.weight.metric,
            weightMin: b.weight.metric.split(/\s*-\s*/)[0],
            weightMax: b.weight.metric.split(/\s*-\s*/)[1],
            image: b.image.url,
            life_span: b.life_span,
            tempers: b.temperament ? b.temperament : 'No hay información sobre los temperamentos'
        };
    })
    // console.log("razas mapeadas", mapedBreeds);
    return mapedBreeds;
}

//Traigo la info de la base de datos
const DbBreeds = async()=>{
    try{
        const db= await Breed.findAll({
                include: {
                model: Temper,
                attributes: ['name'],
                through: {
                    attributes: []
                },
            }
            });
        return db;
    } catch(error){
        console.log(error);
    }
}

// const getTempers = async()=>{
//     const temperApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
//     const tempers = temperApi.data.map(t=>t.temperament).toString().split(/\s*,\s*/);

//     tempers.forEach(t=>{
//         Temper.findOrCreate({
//             where: {name: t},
//         })
//     })

//     const allTempers = await Temper.findAll();
//     console.log("desde el mw", allTempers);
//     return allTempers;
// }

module.exports = {
    filteredApiBreeds,
    DbBreeds
};