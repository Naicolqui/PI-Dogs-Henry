import axios from 'axios';

const GET_BREED = "GET_BREED";
const GET_TEMPER = "GET_TEMPER";
const FILTER_BY_TEMPER = "FILTER_BY_TEMPER";

export const getBreed = ()=>{
    return async (dispatch)=>{
        let pedidoApi = await axios.get("http://localhost:3001/breeds");
        dispatch ({
            type: GET_BREED,
            payload: pedidoApi.data
        })
    }
}

export const getTemper = ()=>{
    return async (dispatch)=>{
        let pedidoApiTemper = await axios.get("http://localhost:3001/tempers");
        dispatch({
            type: GET_TEMPER,
            payload: pedidoApiTemper.data
        })
    }
}

export const filterBreedByTemper = (payload)=>{
    return{
        type: FILTER_BY_TEMPER,
        payload
    }
}