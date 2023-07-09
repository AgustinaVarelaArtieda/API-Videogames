import React from "react";  

export default function Card({name, image, genre}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{genre}</p>
        </div>
    )
}