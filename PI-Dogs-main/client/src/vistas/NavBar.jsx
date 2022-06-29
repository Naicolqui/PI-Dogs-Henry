import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import logoPerro from '../images/logoPerro.png'

export default function NavBar (){
    return (
        <nav className="nav">
          <img className="img" src={logoPerro} alt="not found"/>
          <ul className="list">
              <li className="item">
                  <Link className="link" to={'/home'}>Home</Link>
              </li>
              <li className="item">
                  <Link className="link" to={'/create'}>Agregar una raza</Link>
              </li>
          </ul>
        </nav>
      )
}