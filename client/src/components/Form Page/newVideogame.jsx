import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postGame, getGenres } from "../../redux/actions";
import validate from "./validate";

export default function NewVideogame(){
    const dispatch=useDispatch()
    const history=useNavigate()

    //traigo los genres
    const genres=useSelector((state)=>state.genres)

    //creo un estado LOCAL para los errores
    const [errors,setErrors]=useState({})

    //Estado LOCAL para guardar los inputs del form
    const [input,setInput]=useState({
        name:'',
        image:'',
        description:'',
        platforms:[],       //uso un array vacio para poder agregarle mas de una plataforma
        released:'',
        rating:'',
        genres:[]
    })

    //Para poder renderizar los generos, los despacho
    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        //parte validacion/errores
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    //para checkbox -- se pone en onChange={(e)=>handleCheck} en c/opcion
    // function handleCheck(e){
    //     if(e.target.checked){
    //         setInput({
    //             ...input,
    //             platforms: [...input.platforms,e.target.value]
    //         })
    //     }
    // }

    //Para Select
    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres,e.target.value]        //guardo en un arreglo todo lo que vaya seleccionando
        })
    }

    //Para subir la info
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postGame(input))
        alert('Juego creado!')
        setInput({
            name:'',
            image:'',
            description:'',
            platforms:[],       //uso un array vacio para poder agregarle mas de una plataforma
            released:'',
            rating:'',
            genres:[]
        })
        history.push('/home')   //Redirige a una ruta que yo decida, en este caso al HOME
    }

    //Para eliminar el genero que seleccione
    function handleDelete(el){
        setInput({
            ...input,
            genres: input.genres.filter(e=>e!==el)  //devuelve todo lo que no elimino
        })
    }

    return(
        <div>
            {/*Esto de abajo convendria ponerlo en la NAVBAR*/}
            <Link to='/home'><button>Volver</button></Link>
            {/*Esto de arriba convendria ponerlo en la NAVBAR*/}
            <h1>Nuevo Videojuego</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" value={input.name} name='name' onChange={(e)=>handleChange(e)}></input>
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" value={input.image} name='image' onChange={(e)=>handleChange(e)}></input>
                    {errors.image && (
                        <span className="error">{errors.image}</span>
                    )}
                </div>
                <div>
                    <label>Descripción</label>
                    <input type="text" value={input.description} name='description' onChange={(e)=>handleChange(e)}></input>
                    {errors.description && (
                        <span className="error">{errors.description}</span>
                    )}
                </div>
                <div>
                    <label>Plataformas</label>  {/*Revisar esto y ver de colocar lo mismo que en generos*/}
                    <select name='platforms' multiple onChange={(e)=>setInput({...input,platforms:e.target.value.split(',')})}></select>
                    {errors.platforms && (
                        <span className="error">{errors.platforms}</span>
                    )}
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input type="date" value={input.released} name='released' onChange={(e)=>handleChange(e)}></input>
                    {errors.released && (
                        <span className="error">{errors.released}</span>
                    )}
                </div>
                <div>
                    <label>Rating</label>
                    <input type="number" value={input.rating} name='rating' onChange={(e)=>handleChange(e)}></input>
                    {errors.rating && (
                        <span className="error">{errors.rating}</span>
                    )}
                </div>
                <div>
                    <label>Generos</label>
                    <select onChange={(e)=>handleSelect(e)}>
                        {genres.map((genre)=>(
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                    <ul><li>{input.genres.map(el=>el+',')}</li></ul>{/*Esto muestra lo que el usuario va seleccionando*/}
                    {errors.genres && (
                        <span className="error">{errors.genres}</span>
                    )}
                    {input.genres.map((el=>
                        <div className="divGen">
                            <p>{el}</p>
                            <button className='deleteGen' onClick={(el)=>handleDelete(el)}>Eliminar</button>
                        </div>    
                    ))}
                </div>
                <button type="submit">Crear Juego</button>

                {/*Otra forma de hacer los generos o las plataformas:
                <div>
                    <label>Generos</label>
                    <label><input type='checkbox' name='Accion' value='Accion'/>Accion</label> y repetir con cada uno de los generos
                </div>
                */}
            </form>
        </div>
    )
}