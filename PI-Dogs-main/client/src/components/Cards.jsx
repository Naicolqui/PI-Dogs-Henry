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
    //Creo un estado que tenga y setee la página actual
    const [currentPage, setCurrentPage] = useState(1);
    //Acá saqué el set porque me tiraba un warning. ¿Es correcto?
    const [breedsPerPage] = useState(8);
    //Acá lo dejé por las dudas jajaja
    const [order, setOrder] = useState('');
    const lastBreedIndex = currentPage * breedsPerPage;
    const firstBreedIndex = lastBreedIndex - breedsPerPage;
    // console.log("actualState", actualState)
    //Le digo que en la pagina actual me tome el primer y último index
    const currentBreeds = actualState.slice(firstBreedIndex, lastBreedIndex);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    //---------------------------Map de las Card para traer la info-----------------------------------
    //Llamo a las razas y los temperamentos con el useEffect: asi simulo el estado de vida de los componentes y 
    //despacho la acción que necesito.
    useEffect(()=>{
        dispatch(getBreed())
        dispatch(getTemper())
    }, [dispatch]);


    //-----------------------------Botones---------------------------------
    //con estas funciones defino el funcionamiento (valga la redundancia) de los botones y los filtros utilizados
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
    //El setOrder me modifica el estado local y renderiza

    function handleByWeight(e){
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    //-------------------------------------Renderizado-------------------------------------

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
                   <option value="selected" hidden >Ordenar alfabéticamente</option>
                   <option value="A-Z">A-Z</option>
                   <option value="Z-A">Z-A</option>
                   </select>

                   <select className="select" onChange={e=> handleByWeight(e)}>
                   {/* <option value="all">Todos los perros</option> */}
                   <option value="selected" hidden >Ordenar por peso</option>
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












//DETAIL
const handleSize=(e)=>{
    //agarre el estado size desde reducer 
    //y dependiendo de lo que yo seleccione (el talle) me aparece otro select que vaya
    //desde el 1 hasta el num max de stock
    //que se cargue en algun lado (const datos)
}

//CART
//renderizar datos junto con el resto de la infomación

//EN LA COMPRA
//se crea un put donde se reste la cantidad comprada al stock del talle respectivo
//0: xl ----- 1:s ------2:l <---El usuario lo selecciona





















