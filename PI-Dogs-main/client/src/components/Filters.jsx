import React from "react";

export default function Filters (){
    return (
        <div>
            <select>
               <option value="A-Z">A-Z</option>
               <option value="Z-A">Z-A</option>
           </select>
           <select>
               <option value="all">Todos</option>
               <option value="pesados">Mas Pesados</option>
               <option value="livianos">Mas Livianos</option>
            </select>
            <select>
               <option value="all">Todos</option>
               <option value="api">Desde la API</option>
               <option value="db">Desde DB</option>
            </select>
        </div>
    )
}