import { useEffect, useState } from "react";
import { getName } from "../actions";
import { useDispatch } from 'react-redux';
import './SearchBar.css';

export default function SearchBar(){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getName(search))
    }, [dispatch, search]);

    function onSubmit(e){
        e.preventDefault();
        const searchedName = getName(search)
        console.log("getName", getName(search))
        // console.log(search)
        dispatch(searchedName)
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
        // console.log(e.target.value)
    }

    return(
    <div>
        {/* <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search} onKeyPress={e=> e.key === 'Enter' && handleSubmit(e)}/>
            <input type="submit" value="Buscar"/>
        </form> */}
        <input
            type='text' 
            placeholder='Busca tu raza favorita'
            onChange={e => onInputChange(e)}
            value={search}
            className='inputSearch'
            onKeyPress={e=> e.key === 'Enter' && onSubmit(e)}
        />
        <button
        type='submit'
        onClick={e=> onSubmit(e)}
        className='btnSearch'
        >
            <strong>Buscar!</strong>
        </button>
    </div>
    )
}