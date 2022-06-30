import React from "react";
import logoHenry from "../images/logoHenry.png";
import './Footer.css';
import soyNicole from '../images/soyNicole.png'
import arrow from '../images/arrow.png'

export default function Footer(){
    return (
        <footer className="footer">
            <div className="container">
                <h2>¡Hola!</h2>
            </div>
            <div className="container">
                <img className="soyNicole" src={soyNicole} alt='not found'/>
            </div>
            <div className="container">
                <h3>Y este <img src={arrow} alt='not found'/> es mi proyecto para</h3>
                <img className="soyHenry" src={logoHenry} alt="not found"/>
            </div>
        </footer>
    )
}