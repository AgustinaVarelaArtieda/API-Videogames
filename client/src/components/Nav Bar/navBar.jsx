import SearchBar from "../Search Bar/searchBar";

import { NavLink, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";

import style from "../Nav Bar/navBar.module.css"

export default function Nav(){

    const[mostrarBusqueda,setMostrarBusqueda] = useState(false)
    const location = useLocation()

    useEffect(() =>{
        if(location.pathname === "/home"){
            setMostrarBusqueda(true)
        } else {
            setMostrarBusqueda(false)
        }
    },[location] )

    return(
        <div className={style.nav}>

            <NavLink to='/home' style={{textDecoration:'none'}}><h1>VIDEOGAMES</h1></NavLink>
            
            {/*<NavLink to='/about'><button className={style.btn}>About</button></NavLink>*/}

            <NavLink to='/videogames'><button className={style.btn}>Create</button></NavLink>

            <div>
                {mostrarBusqueda&&<SearchBar/>}
            </div>

        </div>
    );
}

//<button className={style.btn}>Home</button>