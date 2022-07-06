import React from "react";
import './Paginate.css'

export default function Paginate ({breedsPerPage, actualState, paginate}) {
    const pageNum = [];

    for ( let i=1; i<=Math.ceil(actualState/breedsPerPage); i++) {
        pageNum.push(i);
    }

    //Acá renderizo todo
    //Del map salen los números que después se renderizan en el home para poder navegar a través de las páginas
    return (
        <nav className="paginateContainer">
            <ul className="paginate">
                {
                    pageNum && pageNum.map(n => (
                        <li key={n}>
                            <a onClick={()=> paginate(n)}>{n}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}