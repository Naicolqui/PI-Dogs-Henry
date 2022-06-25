import React from "react";
import { Link } from "react-router-dom";

export default function NavBar (){
    return (
        <nav>
          <ul>
              <li>
                  <Link to={'/home'}>Home</Link>
              </li>
              <li>
                  <Link to={'/create'}>Agregar una raza</Link>
              </li>
          </ul>
        </nav>
      )
}