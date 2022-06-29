import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../actions";
import './SearchBar.css';

export default function SearchBar(){

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    const handleChange = (e)=>{
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(getBreed(name))
    }

    return(
        <div className="searchBarContainer">
            <input
            className="input"
            type='text'
            onChange={(e) => handleChange(e)}
            placeholder="Buscar..."
            onKeyPress={e=> e.key === 'Enter' && handleSubmit(e)}/>
            <button
            className="btn"
            type='submit'
            onClick={(e)=> handleSubmit(e)}
            >Buscar</button>
        </div>
    )
}