import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTemper } from "../actions";
import './Form.css'
// import validation from "../functions/formValidation";

export default function Form(){
    //Me traigo los temperamentos para el map
    let actualStateTemper = useSelector(state => state.tempers);

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
        highMin:"",
        highMax: "",
        life_span:"",
        tempers:[]
    });

    //Creo un estado para el error de formulario
    const [formError, setFormError] = useState(true);

    //------------------Validaciones--------------------------

    //Creo este estado para habilitar o deshabilitar el botón del formulario
    const [isSubmit, setisSubmit] = useState(true)

    //subFunciones de validación
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
        if(str.length < 1 || typeof str !== "string") return true;
        return false;
    }

    function longLife(str){
        if(str.length > 5) return true;
        return false;
    }

    //La función madre
    function validation(data){
        let errors = {}

        //Valido los campos obligatorios

        if(exists(data.name) === true) errors.name = "La raza necesita un nombre";

        if(exists(data.weightMin) === true) errors.weightMin = "La raza necesita un nombre";

        if(exists(data.weightMax) === true) errors.weightMax = "La raza necesita un nombre";

        //Valido las distintas características

        if(validName(data.name) === true) errors.name = "El nombre ingresado no es válido";

        if(validWeight(data.weightMax) === true) errors.weightMax = "El peso ingresado no es válido";

        if(validWeight(data.weightMin) === true) errors.weightMin = "El peso ingresado no es válido";

        if(validHigh(data.highMin) === true) errors.highMin = "La altura ingresada no es válida";

        if(validHigh(data.highMax) === true) errors.highMax = "La altura ingresada no es válida";

        if(parseInt(data.highMin)>parseInt(data.highMax)) errors.highMin = "La altura mínima no puede ser mayor que la altura máxima"
        
        if(parseInt(data.highMin)>parseInt(data.highMax)) errors.highMax = "La altura mínima no puede ser mayor que la altura máxima"

        if(validLife(data.life_span) === true) errors.life_span = "La esperanza de vida ingresada no es válida";
        
        if(longLife(data.life_span) === true) errors.life_span = "Nos gustaría que sean eternos pero debemos disfrutarlos mientras estén con nosotors";
        
        // console.log("errors",errors)

        if ((Object.keys(errors).length) === 0){
            setisSubmit(false)
          };
        
        return errors;
    }


    //--------------------handlers--------------------
    let handleChange = (e) =>{
        setBreed({
            ...breed,
            [e.target.name] : e.target.value //Los [] son para establecer una variable como propiedad.
        });

        setFormError(validation(breed));

        // console.log("isSubmit", isSubmit)
    }

    let handleSubmit = async (e) =>{
        e.preventDefault()
        setFormError(validation(breed))

        await axios.post("/breeds/create", breed)
        console.log(breed);
        setBreed({
            name:"",
            image:"",
            weightMin:"",
            weightMax:"",
            high:"",
            life_span:"",
            tempers:[]
        }); //Reinicio el formulario
        // console.log(breed)
        alert("La raza ya fué creada")
    }

    let handleTemper = (e) =>{
        setBreed({
            ...breed,
            tempers: [...new Set([...breed.tempers, e.target.value])] //con el set se borran elementos repetidos.
        })

        console.log("Handle temperamentos:", breed.tempers )
    }


    //------------------Renderizado--------------------
    
    //Input: nombre:reconoce el evento, valor: identifica la propiedad, funcion: dicta las acciones

    return(
        <div className="formContainer">
            <div className="textTitle">
                <h2>Creá tu propia raza canina</h2>
                <h3>Recordá que siempre es mejor adoptar que comprar, hay muchos pichichus que necesitan de nuestro amor y cariño</h3>
            </div>
            
            <form className="form">
                <div className="container">
                    <label>Nombre de la raza</label>
                    <input name={'name'} value={breed.name}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.name ? (<h4 className="error"><small>{formError.name}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Imagen</label>
                    <input  name={'image'} value={breed.image}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.image ? (<h4 className="error"><small>{formError.image}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Peso mínimo <small>(Por favor colocá solo el número)</small></label>
                    <input  name={'weightMin'} value={breed.weightMin}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.weightMin ? (<h4 className="error"><small>{formError.weightMin}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Peso máximo <small>(Por favor colocá solo el número)</small></label>
                    <input name={'weightMax'} value={breed.weightMax}
                    onChange={(e) => handleChange(e)}></input>
                    <div className="errorContainer">
                    {
                        formError.weightMax ? (<h4 className="error"><small>{formError.weightMax}</small></h4>) : false
                    }
                    </div>
                </div>

                <div className="container">
                    <label>Altura mínima <small>(Por favor colocá solo el número)</small></label>
                    <input name={'highMin'} value={breed.highMin}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.highMin ? (<h4 className="error"><small>{formError.highMin}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Altura máxima <small>(Por favor colocá solo el número)</small></label>
                    <input name={'highMax'} value={breed.highMax}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.highMax ? (<h4 className="error"><small>{formError.highMax}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Rango de vida</label>
                    <input name={'life_span'} value={breed.life_span}
                    onChange={(e) => handleChange(e)}></input>
                    {
                        formError.life_span ? (<h4 className="error"><small>{formError.life_span}</small></h4>) : false
                    }
                </div>

                <div className="container">
                    <label>Temperamento 1</label>
                    <select name={'tempers'}
                      onChange={(e) => handleTemper(e)}>
                        <option value="selected" hidden >Elegí un temperamento</option>
                       {
                            actualStateTemper?.map(t=>{
                               return (
                                   <option key={t.id} value={t.name}>{t.name}</option>
                               );
                            })
                        }
                     </select>
                </div>

                <div className="container">
                    <label>Temperamento 2</label>
                    <select name={'tempers'}
                      onChange={(e) => handleTemper(e)}>
                      <option value="selected" hidden >Elegí un temperamento</option>
                       {
                            actualStateTemper?.map(t=>{
                               return (
                                   <option key={t.id} value={t.name}>{t.name}</option>
                               );
                            })
                        }
                     </select>
                </div>

                <div className="container">
                    <label>Temperamento 3</label>
                    <select name={'tempers'}
                      onChange={(e) => handleTemper(e)}>
                      <option value="selected" hidden >Elegí un temperamento</option>
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
                    <button className="btn" type="submit" disabled={isSubmit} id="btn" onClick={(e) => handleSubmit(e)}> Crear raza </button>
                </div>

            </form>
        </div>
    )
}