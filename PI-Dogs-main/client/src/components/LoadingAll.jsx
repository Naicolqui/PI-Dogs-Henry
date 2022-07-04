import React from "react";
import loadingCar from '../images/loadingCar.gif'
import './LoadingAll.css'

export default function LoadingAll (){
    return (
        <img src={loadingCar} alt="not found" className="imageCar"/>
    )
}