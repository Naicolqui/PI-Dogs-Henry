import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTemper } from "../actions";

export default function Form(){
    //Me traigo los temperamentos para el map
    let actualStateTemper = useSelector(state => state.temper);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemper())
    }, [dispatch])
    //Inicializo mi estado
    const [breed, setBreed] = useState({
        name:"",
        image:"",
        weightMin:"",
        weightMax:"",
        high:"",
        life_span:"",
        temper:[]
    });

    //Creo un estado para el error de formulario
    const [formError, setFormError] = useState(true);

    //Creo un estado para el botón de submit
    // const [buttonError, setButtonError] =useState((formError).length<1 ? false : true);

    //--------------------handlers--------------------
    let handleChange = (e) =>{
        setBreed({
            ...breed,
            [e.target.name] : e.target.value
        });

        setFormError(validation(breed));
    }

    let handleSubmit = async (e) =>{
        e.preventDefault()
        setFormError(validation(breed))
        await axios.post("http://localhost:3001/breeds/create", breed)
        setBreed({
            name:"",
            image:"",
            weightMin:"",
            weightMax:"",
            high:"",
            life_span:"",
            temper:[]
        });
        alert("La raza ya fué creada")
    }

    let handleTemper = (e) =>{
        setBreed({
            ...breed,
            temper: [...new Set([...breed.temper, e.target.value])]
        })
    }

    //-----------------Validaciones del formulario (MODULARIZAR)-----------------------

    function validName (str) {
        if(typeof str !== "string") return true;
        if(str.length < 2) return true;
    }

    function validImage (str) {
        if(typeof str !== "string") return true;
        if(!str.includes(".com")) return true;
    }
    
    function validWeight (str) {
        if(typeof str !== "string") return true;
        if(str.length > 4) return true;
    }

    function validHighOrLife (str) {
        if(typeof str !== "string") return true;
        if(str.length > 8) return true;
    }

    function validation(data){
        let errors = {}

        if(validName(data.name)) errors.name = "El nombre ingresado es incorrecto";

        if(validImage(data.image)) errors.image = "La imagen ingresada no existe";

        if(validWeight(data.weightMax)) errors.weightMax = "El valor ingresado es muy largo";

        if(validWeight(data.weightMin)) errors.weightMin = "El valor ingresado es muy largo";

        if(validHighOrLife(data.high)) errors.high = "El valor ingresado es muy largo";

        if(validHighOrLife(data.life_span)) errors.life_span = "El valor ingresado es muy largo";

        return errors;
    }


    //------------------Renderizado--------------------

    return(
        <div>
            <form>
                <div>
                    <label>Nombre de la raza</label>
                    <input name={'name'} value={breed.name}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Imagen</label>
                    <input  name={'image'} value={breed.image}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Peso mínimo</label>
                    <input  name={'weightMin'} value={breed.weightMin}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Peso máximo</label>
                    <input name={'weightMax'} value={breed.weightMax}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Altura aproximada</label>
                    <input name={'high'} value={breed.high}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Rango de vida</label>
                    <input name={'life_span'} value={breed.life_span}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Temperamento</label>
                    <select name={'temper'}
                      onChange={(e) => handleChange(e)}>
                       {
                            actualStateTemper?.map(t=>{
                               return (
                                   <option key={t.id} value={t.name}>{t.name}</option>
                               );
                            })
                        }
                     </select>
                </div>

                <div>
                    <button type="submit" onClick={(e) => handleSubmit(e)}> Crear raza </button>
                </div>

            </form>
        </div>
    )
}