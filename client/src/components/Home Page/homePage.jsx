import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom/cjs/react-router-dom";

import { getVideogames } from "../../redux/actions";

import Card from '../Card/card'

export function Home (){

    const dispatch = useDispatch();
    const allVideogames = useSelector((state)=>state.videogames);       //Trae todo lo que esta en el estado de videogames

    //Traigo los videojuegos del estado cuando se monte el HOME
    useEffect(()=>{
        dispatch(getVideogames());
    },[]);  //le paso el ARRAY vacio porque el useEffect no depende de nada

    //Boton para recargar las paginas/traer todos los juegos de nuevo
    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    return(
        <div>
            <Link to='/videogame'>Crear videojuegpo</Link>
            <h1>VIDEOJUEGOS</h1>

            {/*Esto de abajo convendria ponerlo en la NAVBAR*/}
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los juegos
            </button>
            {/*Esto de arriba convendria ponerlo en la NAVBAR*/}

            {/*Esto de abajo convendria ponerlo en la SEARCHBAR*/}
            <div>
                {/*Esto de abajo es para los filtros*/}
                <select>
                    <option value='asc'>Acsendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select>
                    {/*Esto se puede hacer con un map para pasar todos los generos existentes*/}
                    <option value='All'>Todos</option>
                    <option value='aca se le pasa el mismo valor que tiene en la API'>Action</option>
                    <option value='adv'>Adventure,etccc</option>
                </select>
                <select>
                    <option value='All'>Todos</option>
                    <option value='API'>Datos de la API(existentes)</option>
                    <option value='DB'>Datos de la DB</option>
                </select>
                {/*Esto de arriba es para los filtros*/}
            </div>
            {/*Esto de arriba convendria ponerlo en la SEARCHBAR*/}
            
            {
                allVideogames?.map(el=>{
                    return(
                        <Card name={el.name} image={el.image} genre={el.genre}/>
                    )
                })
            }
        </div>
    )
}