import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanBreeds, getBreedById } from "../actions";
import LoadingDetail from "../components/LoadingDetail";
import './Detail.css'

export default function Detail(){

    const params = useParams();
    const dispatch = useDispatch();

    //Llamo a las razas con el useEffect
    useEffect(()=>{
        dispatch(cleanBreeds())
        dispatch(getBreedById(params.id))
    }, [dispatch, params.id]);
    
    let actualBreed = useSelector(state => state.breedDetail);

    return (
        <div>
        {
            actualBreed.length > 0 ?
            <div className="fullContainer">
                <h2 className="title">Raza: {actualBreed[0]?.name}</h2>
                <div className="contentContainer">
                    <div className="headerContainer">
                        <img className="imageBreed" src={actualBreed[0]?.image} alt="not found"/>
                    </div>
                    <div className="detailContainer">
                         <h4 className="descriptionText">Temperaments:</h4>
                            <ul className="allTempers">
                            {actualBreed[0].CreatedInDB ?
                            actualBreed[0].tempers.map(e => {
                                return <li key={e.name}><label>{e.name}</label></li>
                            }) :
                            actualBreed[0].tempers ?
                            actualBreed[0].tempers.split(', ').map(e => {
                                return <li key={e}><label>{e}</label></li>
                            }) :
                            'Esta raza no posee temperamentos'
                            }
                            </ul>
                        <h4 className="descriptionText">Weight:</h4>
                        <h5>Between {actualBreed[0]?.weightMin}kg and {actualBreed[0].weightMax}kg</h5>
                        <h4 className="descriptionText">Height:</h4>
                        <h5>Between {actualBreed[0]?.highMin}cm and {actualBreed[0]?.highMax}cm</h5>
                        <h4 className="descriptionText">Life rage:</h4>
                        <h5>Between {actualBreed[0]?.life_span}</h5>
                    </div>
                </div>
            </div> :
            <div>
                <LoadingDetail/>
            </div>

        }
        </div>
    )
}