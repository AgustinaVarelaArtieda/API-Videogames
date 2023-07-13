import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getGameByName } from "../../redux/actions";

export default function SearchBar(){
    const dispatch=useDispatch()

    //creo un ESTADO LOCAL
    const [name,setName]=useState()

    //En esta funcion guardo en mi estado local lo que se agregue en mi input
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    //En esta le doy funcionalidad al boton
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getGameByName(name))
        setName("")//Para 'limpiar' la barra de busqueda
    }

    return(
        <div>
            <input type="text" placeholder='Buscar...' onChange={(e)=>handleInputChange(e)}/>
            <button type='submit' onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
    )
}