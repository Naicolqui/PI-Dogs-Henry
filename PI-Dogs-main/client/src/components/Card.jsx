import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({id, name, image, tempers, weightMin, weightMax, CreatedInDB}){
    return (
        <div className='cardContainer'>
            <div className='imageContainer'>
                <img src={image} alt='not found'/>
            </div>
            <div className='textContainer'>
                <h2 className='text'>{name}</h2>
                <h4 className='textTemper'>Temperamento: <br/>
                { function (tempers) {
            if (typeof (tempers) === 'string') {
                return tempers
            }
            if (Array.isArray(tempers)) {
                let temps = tempers.map(e => e.name)
                return temps.join(', ')
            }
        }(tempers)}</h4>
                <h4 className='text'>Peso: <br/> desde los {weightMin} hasta los {weightMax}kg</h4>

                <Link to={'details/' + id } className='linkBtn'><button className='btn'>Más información</button></Link>
            </div>
        </div>
    );
}
