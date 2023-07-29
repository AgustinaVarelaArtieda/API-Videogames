import React from "react";  

//import { useNavigate, useParams } from "react-router-dom";

import style from '../Card/card.module.css'

export default function Card({name, image, genres, rating}){
    return(
        <div className={style.card}>
            <div className={style.card2}>
                <h3>{name}</h3>
                <img src={image} alt={name}/>
                <h4>{Array.isArray(genres) ? genres.map(genre => genre.name).join(", ") : genres}</h4>
                <p>★ {rating}</p>
            </div>
        </div>
    )
}




// const navigate=useNavigate()
    // const { key }=useParams()

    // const handleClick = (e) => {

    //     navigate('/home/'+key)
        
    // }