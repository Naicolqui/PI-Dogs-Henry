import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({id, name, image, temper, weightMin, weightMax}){
    return (
        <div className='cardContainer'>
            <div className='imageContainer'>
                <img src={image} alt='not found'/>
            </div>
            <div className='textContainer'>
                <h2 className='text'>{name}</h2>
                <h3 className='text'>Temperamento:</h3>
                <h3 className='text'> {temper}</h3>
                <h4 className='text'>Peso: {weightMin} - {weightMax}</h4>
            </div>
            <div className='btnContainer'>
                <Link to={'details/' + id }><button className='btn'>Más información</button></Link>
            </div>
        </div>
    );
}