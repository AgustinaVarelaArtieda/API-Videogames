import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getGameByName } from "../../redux/actions";

import style from '../Search Bar/searchBar.module.css'

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
        <div className={style.group}>
            <input type="text" placeholder='Buscar...' onChange={(e)=>handleInputChange(e)}/>
            <button className={style.btnS} type='submit' onClick={(e)=>handleSubmit(e)}>🔍︎</button>
        </div>
    )
}