import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useDispatch, useSelector} from 'react-redux';
// import {Link} from 'react-router-dom';
import { filterBreedByTemper, filterByName, filterByOrigin, filterByWeight, getBreed, getTemper } from "../actions";
import Paginate from "./Paginate";
import './Cards.css'
import SearchBar from "./SearchBar";
import LoadingAll from "./LoadingAll";

export default function Cards(){
    let actualState = useSelector(state => state.breed);
    let actualStateTemper = useSelector(state => state.tempers);
    const dispatch = useDispatch();

    //---------------------Paginado---------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage] = useState(8);
    const [order, setOrder] = useState('');
    const lastBreedIndex = currentPage * breedsPerPage;
    const firstBreedIndex = lastBreedIndex - breedsPerPage;
    // console.log("actualState", actualState)
    const currentBreeds = actualState.slice(firstBreedIndex, lastBreedIndex);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    //---------------------------Map de las Card para traer la info-----------------------------------
    //Llamo a las razas con el useEffect
    useEffect(()=>{
        dispatch(getBreed())
        dispatch(getTemper())
    }, [dispatch]);


    //-----------------------------Botones---------------------------------
    function handleByTemper(e){
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterBreedByTemper(e.target.value))
    }

    function handleByOrigin(e){
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByOrigin(e.target.value))
    }

    function handleByName(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleByWeight(e){
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    //-------------------------------------Renderizado-------------------------------------
    // .sort(function(a,b){
    //     if(a.name<b.name) return -1;
    //     if(a.name>b.name) return 1;
    //     return 0;
    // }) PARA EL FILTRO DE TEMPERAMENTOS

    return (
        <div className="containter">
            <div className="filter">
               <select className="select" onChange={e=> handleByTemper(e)}>
                   <option key={0} value='all'>Todos los temperamentos</option>
                   {
                       actualStateTemper?.map(t=>{
                           return (
                               <option key={t.id} value={t.name}>{t.name}</option>
                           );
                       })
                   }
               </select>
  
               <select className="select" onChange={e=> handleByName(e)}>
                   <option value="A-Z">A-Z</option>
                   <option value="Z-A">Z-A</option>
                   </select>

                   <select className="select" onChange={e=> handleByWeight(e)}>
                   {/* <option value="all">Todos los perros</option> */}
                   <option value="most">Más pesados</option>
                   <option value="less">Más livianos</option>
                   </select>

                   <select className="select" onChange={e=> handleByOrigin(e)}>
                   <option value="all">Todos los perros</option>
                   <option value="api">Perros de la API</option>
                   <option value="db">Perros de la Base de Datos</option>
                   </select>
            </div>

            <div>
               <SearchBar/>                
            </div>


            <div>
                <Paginate 
                   breedsPerPage={breedsPerPage}
                   actualState={actualState.length}
                   paginate={paginate}
                />
                <div className="cards">
                {
                currentBreeds.length > 0 ? currentBreeds.map(b=>
                  <div className="cardsMaped">
                     {/* <Link key={b.id}> */}
                         <Card key={b.id} name={b.name} image={b.image} tempers={b.tempers} weightMin={b.weightMin} weightMax={b.weightMax} id={b.id}/>
                     {/* </Link> */}
                  </div>
                  ) : 
                  <div>
                    <LoadingAll/>
                  </div>
                } 
                </div>
            </div>
        </div>
    )
}