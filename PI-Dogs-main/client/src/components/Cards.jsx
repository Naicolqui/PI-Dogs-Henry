import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { getBreed } from "../actions";
import Paginate from "./Paginate";
import './Cards.css'

export default function Cards(){
    let actualState = useSelector(state => state.breed);
    const dispatch = useDispatch();

    //---------------------Paginado---------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage] = useState(8);
    const lastBreedIndex = currentPage * breedsPerPage;
    const firstBreedIndex = lastBreedIndex - breedsPerPage;
    const currentBreeds = actualState.slice(firstBreedIndex, lastBreedIndex);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    //---------------------------Map de las Card para traer la info-----------------------------------
    //Llamo a las razas con el useEffect
    useEffect(()=>{
        dispatch(getBreed())
    }, [dispatch]);

    return (
        <div>
            <div>           
                <Paginate 
                   breedsPerPage={breedsPerPage}
                   actualState={actualState.length}
                   paginate={paginate}
                />
                {
                currentBreeds.length > 0 ? currentBreeds.map(b=>
                  <div className="cardContainer">
                     <Link key={b.id} to={`/details/${b.id}`}>
                         <Card name={b.name} image={b.image} temper={b.temper} weight={b.weight}/>
                     </Link>
                  </div>
                  ) : <h2>No hay nada</h2>
                }
            </div>
        </div>
    )
}