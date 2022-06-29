import React from "react";
import './Paginate.css'

export default function Paginate ({breedsPerPage, actualState, paginate}) {
    const pageNum = [];

    for ( let i=1; i<=Math.ceil(actualState/breedsPerPage); i++) {
        pageNum.push(i);
    }

    //Acá renderizo todo
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