import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage (){
    return(
        <div>
            <h1>¡Adoptá un perrito y dale el hogar que merece!</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}