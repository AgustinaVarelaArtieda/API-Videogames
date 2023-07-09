import { GET_GAMES } from "./typeActions"

const initialState={
    videoGames:[]
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_GAMES:
            return{
                ...state,
                videoGames:action.payload
            };
        default:
            return state;
    }
}

export default rootReducer