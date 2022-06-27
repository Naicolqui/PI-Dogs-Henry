import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBreedById } from "../actions";
import Loading from "../components/Loading";

export default function Detail(){

    const params = useParams();
    const dispatch = useDispatch();

    //Llamo a las razas con el useEffect
    useEffect(()=>{
        dispatch(getBreedById(params.id))
    }, [dispatch, params.id]);
    
    let actualBreed = useSelector(state => state.breedDetail);

    return (
        <div>
                    {
            actualBreed.length > 0 ?
            <div>
            <div><h2>Raza: {actualBreed[0]?.name}</h2></div>
            <img src={actualBreed[0]?.image} alt="not found"/>
            <div>
                <h4>Temperamento: {actualBreed[0]?.temper}</h4>
                <h4>Peso: {actualBreed[0]?.weightMin} - {actualBreed[0].weightMax}</h4>
                <h4>Altura: {actualBreed[0]?.high}</h4>
                <h4>Esperanza de vida: {actualBreed[0]?.life_span}</h4>
            </div>
        </div> :
        <div>
            <Loading/>
        </div>

        }
        </div>
    )
}