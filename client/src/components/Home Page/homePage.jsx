import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getVideogames, filterGamesByGenre, filterOrigin, orderByName, orderByRating } from '../../redux/actions'

import Card from '../Card/card'
import Pagination from '../Pagination/pagination'
import Nav from "../Nav Bar/navBar";
import Loading from "../Loading Page/loadingPage";

import style from '../Home Page/homePage.module.css'

export default function Home (){
    const dispatch = useDispatch();
    
    //'Traigo' el estado global
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
    },[dispatch]);
      
    //LOADING
    const [loading, setLoading] = useState(true);       //para controlar si se debe mostrar LoadingPage o las cartas

    useEffect(()=>{
        const timer=setTimeout(()=>{        //temporizador para desactivar la loading luego de un segundo y medio
            setLoading(false)
        },30700);
        return ()=>{
            clearTimeout(timer)
        }
    },[])

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
    

    //ORDEN
    //ordenar por nombre
    function handleSortName(e){
        e.preventDefault();
        
        const selectedOrder=e.target.value;
        
        dispatch(orderByName(selectedOrder))    
        setCurrentPage(1);      //para que empiece a ordenar desde la primera pagina
    
        orderByRefR.current.value = 'default';  //esto setea el orden por rating
    }
    //ordenar por rating
    function handleSortRating(e) {
        const selectedRating = e.target.value;
        dispatch(orderByRating(selectedRating));

        setCurrentPage(1); //esto redirige a la pagina 1

        orderByRefA.current.value = 'default';  //esto setea el orden alfabetico
      }

      const orderByRefR= useRef();     //para obtener y modificar el valor del <select> del orden por rating
      const orderByRefA = useRef();    //para obtener y modificar el valor del <select> del orden Alfabetico
    //Boton para reiniciar los filtros
    function handleResetFilters(e) {
        e.preventDefault();     
        dispatch(getVideogames());      //recargar las paginas/traer todos los juegos de nuevo

        setCurrentPage(1); //esto redirige a la pagina 1

        // Establecer el valor del <select> en la opción predeterminada
        orderByRefA.current.value = 'default';
        orderByRefR.current.value = 'default';
      }
    
    return(
        <div className={style.layout}>

            <Nav/>{/*Aqui agrego la barra de Navegación, dentro esta la searchbar*/}
            
        <main>
            {/*Esto de abajo es para los filtros y ordenamientos*/}
            <div className={style.filters}>

                <h2>Filtros</h2>

                {/*Esto de abajo es para resetear los filtros*/}
                <button className={style.btnFilter} onClick={e=>{handleResetFilters(e)}}>Reset Filters</button>

                {/*Esto de abajo son los ordenamientos*/}
                {/*Orden por rating*/}
                <h5>Rating</h5>
                <select onChange={(e)=>handleSortRating(e)} ref={orderByRefR} defaultValue='default'>
                    <option value='default' disabled> - </option>
                    <option value='asc'>Mayor ★</option>
                    <option value='desc'>Menor ★</option>
                </select>
                
                {/*Orden asc y desc*/}
                <h5>Orden alfabético</h5>
                <select onChange={(e)=>handleSortName(e)} ref={orderByRefA} defaultValue='default'>
                    <option value='default' disabled> - </option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                {/*Esto de abajo son los filtros*/}
                {/*Filtro por género*/}
                <h5>Género</h5>
                <select onChange={e=>handleFilterGenre(e)}>
                    {/*Esto se puede hacer con un map para pasar todos los generos existentes*/}
                    <option value='All'>Todos</option>
                    <option value='aca se le pasa el mismo valor que tiene en la API'>Action</option>
                    <option value='Adventure'>Adventure</option>
                </select>
                {/*Filtro por origen*/}
                <h5>Origen</h5>
                <select onChange={e=>handleFilterOrigin(e)}>
                    <option value='All'>Todos</option>
                    <option value='API'>Datos de la API(existentes)</option>
                    <option value='DB'>Datos de la DB</option>
                </select>
            </div>
            
            <div className={style.cards}>
            {loading ? (
                <Loading />     /*Esto trae la loadingPage*/
            ) : (
                 currentGames?.map(el => {      /*Esto trae las cards al home*/
                    return (
                        <Card key={el.id} name={el.name} image={el.image} genres={el.genres} rating={el.rating} />
                    );
                }))}
            </div>
        </main>

            <footer>
            {/*Esto realiza el paginado*/}
                <Pagination gamesPerPage={gamesPerPage} allVideogames={allVideogames.length} paginated={paginated}/>
            </footer>
        </div>
    )
}

/*Esto es para el filtro por rating si llego a hacerlo
<div className={style.rating}>
                    <input type="radio" id="star5" name="rate" value="5" onChange={handleSortRating}/>
                    <label htmlFor="star5" title="5"></label>
                    <input type="radio" id="star4" name="rate" value="4" onChange={handleSortRating}/>
                    <label htmlFor="star4" title="4"></label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={handleSortRating}/>
                    <label htmlFor="star3" title="3"></label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={handleSortRating}/>
                    <label htmlFor="star2" title="2"></label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={handleSortRating}/>
                    <label htmlFor="star1" title="1"></label>
</div>*/