import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage (){
    return(
        <div className='containerLanding'>
            <h1>¡Adoptá un perrito y dale el hogar que merece!</h1>
            <Link to='/home'>
                <button className='btn btnLanding'>Ingresar</button>
            </Link>
        </div>
    )
}