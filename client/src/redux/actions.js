import axios from 'axios';
import { GET_GAMES } from './typeActions';

export function getVideogames(){
    return async function(dispatch){
        var json=await axios.get('http://localhost:3001/videogames');       //aca sucede la conexion entre el FRONT y el BACK        
        return dispatch({
            type:GET_GAMES,
            payload: json.data
        });
    }
}
