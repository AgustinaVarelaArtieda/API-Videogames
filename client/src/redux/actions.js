import axios from 'axios';
import { GET_GAMES, GET_GENRES, GET_GAME_DETAILS, FILTER_BY_GENRE, FILTER_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING, SEARCH_GAMES_NAME } from './typeActions';

export function getVideogames(){
    return async function(dispatch){
        var json=await axios.get('http://localhost:3001/videogames');       //aca sucede la conexion entre el FRONT y el BACK        
        return dispatch({
            type:GET_GAMES,
            payload: json.data
        });
    }
}

//ruta para traer los juegos por su nombre
export function getGameByName(name){
    return async function(dispatch){
        try {
            var json=await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: SEARCH_GAMES_NAME,
                payload: json.data
            })
        } catch(error){
            throw Error(error); //hacer un new ERROR
        }
    }
}

//para traer por ID
export function getGameDetails(id){
    return async function(dispatch){
        try {
            var json=await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_GAME_DETAILS,
                payload: json.data
            })
        } catch(error){
            throw Error(error)
        }
    }
}

//Traer los generos
export function getGenres(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

//CREACION DE JUEGOS
export function postGame(payload){
    return async function(dispatch){
        const response=await axios.post('http://localhost:3001/videogames',payload);
        return response;
    }
}

//FILTROS
export function filterGamesByGenre(genre){
    return {
        type: FILTER_BY_GENRE,
        payload:genre
    }
}

export function filterOrigin(origin){
    return {
        type:FILTER_ORIGIN,
        payload: origin
    }
}

//ORDENAMIENTO
export function orderByName(order){
    return {
        type:ORDER_BY_NAME,
        payload: order
    }
}

export function orderByRating(rating){
    return {
        type:ORDER_BY_RATING,
        payload:rating
    }
}
