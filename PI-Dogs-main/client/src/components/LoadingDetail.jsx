import React from "react";
import loadingLoop from '../images/loadingLoop.gif'
import './LoadingDetail.css'

export default function LoadingDetail(){
    return(
        <img src={loadingLoop} alt="not found" className="imageLoop"/>
    )
}