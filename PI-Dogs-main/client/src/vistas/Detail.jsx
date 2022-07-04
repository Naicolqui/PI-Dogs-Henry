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
            <h4 className="caracts">Temperamentos:</h4>
                                    <ul className="allTemps">
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
                <h4>Peso: Entre los {actualBreed[0]?.weightMin}kg y los {actualBreed[0].weightMax}kg</h4>
                <h4>Altura: Entre los {actualBreed[0]?.highMin}cm y los {actualBreed[0]?.highMax}cm</h4>
                <h4>Esperanza de vida: {actualBreed[0]?.life_span} años</h4>
            </div>
        </div> :
        <div>
            <Loading/>
        </div>

        }
        </div>
    )
}