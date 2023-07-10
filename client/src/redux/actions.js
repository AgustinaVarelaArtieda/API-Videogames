import axios from 'axios';
import { GET_GAMES,FILTER_BY_GENRE, FILTER_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING } from './typeActions';

export function getVideogames(){
    return async function(dispatch){
        var json=await axios.get('http://localhost:3001/videogames');       //aca sucede la conexion entre el FRONT y el BACK        
        return dispatch({
            type:GET_GAMES,
            payload: json.data
        });
    }
}

export function filterGamesByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterOrigin(payload){
    return {
        type:FILTER_ORIGIN,
        payload
    }
}

export function orderByName(payload){
    return {
        type:ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload){
    return {
        type:ORDER_BY_RATING,
        payload
    }
}
