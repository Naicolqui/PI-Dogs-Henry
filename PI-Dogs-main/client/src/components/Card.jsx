import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({id, name, image, temper, weightMin, weightMax}){
    return (
        <div className="card">
            <h2 className="name">{name}</h2>
            <img className="img" src={image} alt="not found" />
            <h4 className="p">{temper}</h4>
            <div>
               <h4 className="p">{weightMin}</h4>
               <h4 className="p">{weightMax}</h4>
            </div>
            <Link to={'/details/' + id}><button>Más información</button></Link>
        </div>
    );
}