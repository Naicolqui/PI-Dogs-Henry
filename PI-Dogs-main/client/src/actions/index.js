import axios from 'axios';

const GET_BREED = "GET_BREED";
const GET_TEMPER = "GET_TEMPER";
const FILTER_BY_TEMPER = "FILTER_BY_TEMPER";
const GET_BY_ORIGIN = "GET_BY_ORIGIN"
const GET_BY_NAME = "GET_BY_NAME"
const GET_BY_WEIGHT = "GET_BY_WEIGHT";
const GET_BY_ID = "GET_BY_ID"; 
// const GET_NAME = "GET_NAME";

export const getBreed = (name)=>{
    return async (dispatch)=>{
        if(name){
            let pedidoNombre = await axios.get('http://localhost:3001/breeds?name=' + name)
            dispatch({
                type: GET_BREED,
                payload: pedidoNombre.data
            })
        }
        if (!name){
            let pedidoApi = await axios.get("http://localhost:3001/breeds");
            dispatch ({
                type: GET_BREED,
                payload: pedidoApi.data
            })
        }
    }
}

export const getTemper = ()=>{
    return async (dispatch)=>{
        let pedidoApiTemper = await axios.get("http://localhost:3001/temper");
        dispatch({
            type: GET_TEMPER,
            payload: pedidoApiTemper.data
        })
    }
}

export const getBreedById = (id)=>{
    return async (dispatch) =>{
        let pedidoApiId = await axios.get("http://localhost:3001/breeds/" + id);
        dispatch({
            type: GET_BY_ID,
            payload: pedidoApiId.data
        })
    }
}

// export const getName = (name)=>{
//     return async function (dispatch){
//         try{
//             return axios.get('http://localhost:3001/breeds?name=' + name)
//             .then(res => dispatch({ 
//                 type: GET_NAME, 
//                 payload: res.data 
//             }))
//         } catch(error){
//             console.log(error);
//         }
//     }
// }

export const filterBreedByTemper = (payload)=>{
    return{
        type: FILTER_BY_TEMPER,
        payload
    }
}

export const filterByOrigin = (payload)=>{
    return {
        type: GET_BY_ORIGIN,
        payload
    }
}

export const filterByName = (payload)=>{
    return {
        type: GET_BY_NAME,
        payload
    }
}

export const filterByWeight = (payload)=>{
    return {
        type: GET_BY_WEIGHT,
        payload
    }
}
