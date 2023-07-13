import React from "react";  

import { useNavigate, useParams } from "react-router-dom";

export default function Card({name, image, genres}){
    const navigate=useNavigate()
    const { key }=useParams()

    const handleClick = (e) => {

        navigate(`/home/${key}`)
    }

    return(
        <div>
            <h3>{name}</h3>
           
            <img src={image} alt={name} onClick={(e)=>handleClick(e)}/>
            
            <h4>{genres}</h4>
        </div>
    )
}