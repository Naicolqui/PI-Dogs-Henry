import { useEffect, useState } from "react";
import { getName } from "../actions";
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getName(search))
    }, [dispatch, search]);

    function onSubmit(e){
        e.preventDefault();
        dispatch(getName(search))
        console.log(getName(search))
        console.log(search)
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    return(
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search}/>
            <input type="submit" value="Buscar"/>
        </form>
    </div>
    )
}