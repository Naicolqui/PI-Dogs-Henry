import React from "react";

export default function Detail({name, image, weightMax, weightMin, high, life_span, temper}){
    return (
        <div>
            <div>
                <h2>Nombre: {name}</h2>
                <img src={image} alt="not found"/>
                <div>
                    <h4>Peso: {weightMin} - {weightMax}</h4>
                    <h4>Altura: {high}</h4>
                    <h4>Años de vida: {life_span}</h4>
                </div>
                <div>
                    <h3>¿Cómo son?</h3>
                    <h4>Los {name} son {temper}</h4>
                </div>
            </div>
        </div>
    )
}