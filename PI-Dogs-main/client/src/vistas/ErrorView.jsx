import React from "react";
import './ErrorView.css';
import Error from '../images/Error.png'

export default function ErrorView (){
    return (
        <div className="errorContainer">
            <img src={Error} alt='not found'/>
        </div>
    )
}