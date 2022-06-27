import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../actions";

export default function SearchBar(){

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleChange = (e)=>{
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(getName(name))
    }

    return(
        <div>
            <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Buscar..."
            />
            <button
            type="submit"
            onClick={(e)=> handleSubmit(e)}
            >Buscar</button>
        </div>
    )
}