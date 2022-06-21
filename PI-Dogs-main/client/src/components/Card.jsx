import React from 'react';
import './Card.css';

export default function Card({name, image, temper, weight}){
    return (
        <div className="card">
            <h2 className="name">{name}</h2>
            <img className="img" src={image} alt="not found" />
            <h4 className="p">{temper}</h4>
            <h4 className="p">{weight}</h4>
        </div>
    );
}