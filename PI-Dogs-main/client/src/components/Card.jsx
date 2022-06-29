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
                <h4 className='textTemper'>Temperamento: <br/> {temper}</h4>
                <h4 className='text'>Peso: <br/> {weightMin} - {weightMax}</h4>

                <Link to={'details/' + id } className='linkBtn'><button className='btn'>Más información</button></Link>
            </div>
        </div>
    );
}