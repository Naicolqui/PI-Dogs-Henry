import axios from 'axios';

export const GET_BREED = "GET_BREED";
export const GET_TEMPER = "GET_TEMPER";
export const FILTER_BY_TEMPER = "FILTER_BY_TEMPER";
export const GET_BY_ORIGIN = "GET_BY_ORIGIN"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_BY_WEIGHT = "GET_BY_WEIGHT";
export const GET_BY_ID = "GET_BY_ID"; 
export const GET_NAME = "GET_NAME";

// export const getBreed = (name)=>{
//     return async (dispatch)=>{
//         // if(name){
//         //     let pedidoNombre = await axios.get('http://localhost:3001/breeds?name=' + name)
//         //     dispatch({
//         //         type: GET_BREED,
//         //         payload: pedidoNombre.data
//         //     })
//         // }
//         if (!name){
//             let pedidoApi = await axios.get("http://localhost:3001/breeds");
//             dispatch ({
//                 type: GET_BREED,
//                 payload: pedidoApi.data
//             })
//         }
//     }
// }

export function getBreed(name) {
    return async function (dispatch) {
            // if (name) {
            //     return axios.get('http://localhost:3001/breeds?name=' + name)
            //         .then(res => dispatch({ type: GET_BREED, payload: res.data }))
            //         .catch(err => dispatch({ type: GET_BREED, payload: err.data }))
            // }
            let json = await axios.get('http://localhost:3001/breeds', {})
            return dispatch({
                type: GET_BREED,
                payload: json.data
            })
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


export function getName(name) {
    return function (dispatch) {
      axios.get('http://localhost:3001/breeds?name=' + name)
        .then((res) => {
          dispatch({
            type: GET_NAME,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
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
