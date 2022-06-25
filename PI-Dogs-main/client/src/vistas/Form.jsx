import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTemper } from "../actions";
// import validation from "../functions/formValidation";

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

    // Creo un estado para el botón de submit
    // const [buttonError, setButtonError] =useState(true);

    //------------------Validaciones--------------------------

    
    const [isSubmit, setisSubmit] = useState(true)

    function exists(str){
        if (!str) return true;
        return false;
    }

    function validName(str){
        if(str.length < 1 || str.length > 30) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validWeight(str){
        if(str.length < 1 || str.length > 10) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validHigh(str){
        if(str.length < 1 || str.length > 5) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validLife(str){
        if(typeof str !== "string") return true;
        return false;
    }

    function longLife(str){
        if(str.length < 1 || str.length > 5) return true;
        return false;
    }


    function validation(data){
        let errors = {}

        //Valido los campos obligatorios

        if(exists(data.name) === true) errors.name = "La raza necesita un nombre";

        if(exists(data.high) === true) errors.high = "La raza necesita un nombre";

        if(exists(data.weightMin) === true) errors.weightMin = "La raza necesita un nombre";

        if(exists(data.weightMax) === true) errors.weightMax = "La raza necesita un nombre";

        //Valido las distintas características

        if(validName(data.name) === true) errors.name = "El nombre ingresado no es válido";

        if(validWeight(data.weightMax) === true) errors.weightMax = "El peso ingresado no es válido";

        if(validWeight(data.weightMin) === true) errors.weightMin = "El peso ingresado no es válido";

        if(validHigh(data.high) === true) errors.high = "La altura ingresada no es válida";

        if(validLife(data.life_span) === true) errors.life_span = "La esperanza de vida ingresada no es válida";

        if(longLife(data.life_span) === true) errors.life_span = "Nos gustaría que sean eternos pero debemos disfrutarlos mientras estén con nosotors";
        
        if ((Object.keys(errors).length) === 0){
            setisSubmit(false)
          };
        
        return errors;
    }


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
                        formError.image ? (<h4><small>{formError.image}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Peso mínimo</label>
                    <input  name={'weightMin'} value={breed.weightMin}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.weightMin ? (<h4><small>{formError.weightMin}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Peso máximo</label>
                    <input name={'weightMax'} value={breed.weightMax}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.weightMax ? (<h4><small>{formError.weightMax}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Altura aproximada</label>
                    <input name={'high'} value={breed.high}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.high ? (<h4><small>{formError.high}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Rango de vida</label>
                    <input name={'life_span'} value={breed.life_span}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.life_span ? (<h4><small>{formError.life_span}</small></h4>) : false
                    }
                </div>

                <div>
                    <label>Temperamento</label>
                    <select name={'temper'}
                      onChange={(e) => handleTemper(e)}>
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
                    <button type="submit" disabled={isSubmit} id="btn" onClick={(e) => handleSubmit(e)}> Crear raza </button>
                </div>

            </form>
        </div>
    )
}