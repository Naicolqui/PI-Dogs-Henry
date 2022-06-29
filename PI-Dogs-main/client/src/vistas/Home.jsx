import React from "react";
import Cards from "../components/Cards";
import "./Home.css"
// import SearchBar from "../components/SearchBar";

export default function Home (){
    return (
        <div className="backgroundContainer">
            <h2 className="title">Conocé a nuestros perritos</h2>
            <Cards/>
        </div>
    )
}