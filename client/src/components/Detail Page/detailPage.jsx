import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getGameDetails } from "../../redux/actions";

export default function Detail(){
    const dispatch=useDispatch()

    const { id }=useParams()

    useEffect(()=>{
        dispatch(getGameDetails(id))
        // eslint-disable-next-line
    },[])

    const {myVideogame}=useSelector((state)=>state)    //me traigo del reducer el ESTADO GLOBAL detalle

    return(
        <div>
            {
                myVideogame?
                    <div>
                        <h1>{myVideogame[0].name}</h1>
                        <h3>ID:{myVideogame[0].id}</h3>
                        <img src={myVideogame[0].image} alt={myVideogame[0].name}/>
                        <p>{myVideogame[0].description}</p>
                        <p>Plataformas:{' '} 
                            {myVideogame[0].platforms?.join(', ')}</p> {/*Hacer lo mismo que en genres*/}
                        <p>Fecha de lanzamiento: {myVideogame[0].released}</p>
                        <p>Rating: {myVideogame[0].rating}</p>
                        <h4>Géneros: {!isNaN(myVideogame[0].id)? myVideogame[0].genres+' ' : myVideogame[0].genres?.map(el=>el.name).join(', ')}</h4>  {/*Accedo de distinta forma a la info por como se guardan los generos en mi DB*/}
                    </div>
                : <p>Loading...</p> /*aca renderizar la pagina LOADING */
            }
        </div>
    )
}

//TESTING DEL BACK ESTA TODO EN EL CHECKPOINT DEL M3
//TESTING DEL FRONT VER CPM2 Y HWM2