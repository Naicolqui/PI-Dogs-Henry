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
            high: b.height.metric,
            weight: b.weight.metric,
            image: b.image.url,
            life_span: b.life_span,
            temper: b.temperament
        };
    })
    // console.log("razas mapeadas", mapedBreeds);
    return mapedBreeds;
}

//Traigo la info de la base de datos
const DbBreeds = async()=>{
    try{
        const db= Breed.findAll({
                include: {
                model: Temper,
                attributes: ['name'],
                through: {
                    attributes: [],
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