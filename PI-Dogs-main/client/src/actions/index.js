import axios from 'axios';

const GET_BREED = "GET_BREED";

export const getBreed = ()=>{
    return async (dispatch)=>{
        let pedidoApi = await axios.get("http://localhost:3001/breeds");
        dispatch ({
            type: GET_BREED,
            payload: pedidoApi.data
        })
    }
}