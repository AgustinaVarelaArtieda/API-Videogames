import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getVideogames, filterGamesByGenre, filterOrigin, orderByName } from '../../redux/actions'

import Card from '../Card/card'
import Pagination from '../Pagination/pagination'

//searchbar
import SearchBar from "../Search Bar/searchBar";

export default function Home (){
    //'Traigo' el estado global
    const dispatch = useDispatch();
    const allVideogames = useSelector((state)=>state.videogames);       //Trae todo lo que esta en el estado de videogames(ESTADO GLOBAL)

    //PAGINACION
    //Creacion de estados LOCALES
    const [currentPage, setCurrentPage]=useState(1)     //Pagina actual y seteo de pagina actual, empieza en 1 porque siempre voy a entrar a la primera pagina
    
    // eslint-disable-next-line
    const [gamesPerPage, setGamesPerPage]=useState(15)  //Cuantos games por pagina quiero

    //Creacion de constantes para ubicar los juegos segun el indice
    const indexOfLastGame=currentPage*gamesPerPage  
    const indexOfFirstGame=indexOfLastGame-gamesPerPage

    //Division de games por pagina
    const currentGames= allVideogames.slice(indexOfFirstGame,indexOfLastGame) //Esta const contiene los personajes que van a tener la pagina actual
    
    //Funcion para el renderizado del paginado
    function paginated(pageNumber){
        setCurrentPage(pageNumber)
    }


    //Traigo los videojuegos del estado cuando se monte el HOME
    useEffect(()=>{
        dispatch(getVideogames());
    },[dispatch]);  //le paso el ARRAY vacio porque el useEffect no depende de nada

    
    //Boton para recargar las paginas/traer todos los juegos de nuevo
    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }


    //FILTRADO
    //Filtrado por genero
    function handleFilterGenre(e){
        const genre=e.target.value;
        dispatch(filterGamesByGenre(genre));
    }
    //filtrado por origen(API,DB)
    function handleFilterOrigin(e){
        const origin=e.target.value;
        dispatch(filterOrigin(origin));
    }
    //filtrado por



    //ORDEN
    //genero un estado local
    const [nameOrder,setNameOrder]=useState('');

    //ordenar por nombre
    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(nameOrder))    
        setCurrentPage(1);      //para que empiece a ordenar desde la primera pagina
        setNameOrder(`Ordenado ${e.target.value}`)   //me modifica el estado local y me renderiza la pagina ordenada.
    }
    //ordenar por rating


    return(
        <div>
            <h1>VIDEOJUEGOS</h1>
            <Link to='/videogames'>Crear videojuego</Link>

            {/*Esto de abajo convendria ponerlo en la NAVBAR*/}
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los juegos
            </button>
            <SearchBar/>
            {/*Esto de arriba convendria ponerlo en la NAVBAR*/}

            {/*Esto de abajo convendria ponerlo en la SEARCHBAR*/}
            <div>
                {/*Esto de abajo es para los filtros*/}
                <select onChange={e=>handleSortName(e)}>
                    <option value='asc'>Acsendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e=>handleFilterGenre(e)}>
                    {/*Esto se puede hacer con un map para pasar todos los generos existentes*/}
                    <option value='All'>Todos</option>
                    <option value='aca se le pasa el mismo valor que tiene en la API'>Action</option>
                    <option value='Adventure'>Adventure,etccc</option>
                </select>
                <select onChange={e=>handleFilterOrigin(e)}>
                    <option value='All'>Todos</option>
                    <option value='API'>Datos de la API(existentes)</option>
                    <option value='DB'>Datos de la DB</option>
                </select>
                {/*Esto de arriba es para los filtros*/}
            </div>
            {/*Esto de arriba convendria ponerlo en la SEARCHBAR*/}
            
            {/*Esto trae las cards al home*/}
            {
                currentGames?.map(el=>{
                    return(
                        <Card key={el.id} name={el.name} image={el.image} genres={el.genres}/>
                    )
                })
            }

            {/*Esto realiza el paginado*/}
            <Pagination gamesPerPage={gamesPerPage} allVideogames={allVideogames.length} paginated={paginated}/>
        
        </div>
    )
}