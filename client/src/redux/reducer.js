import { FILTER_BY_GENRE, FILTER_ORIGIN, GET_GAMES, ORDER_BY_NAME, ORDER_BY_RATING } from "./typeActions"

const initialState={
    videogames:[],
    allGames:[]
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_GAMES:
            return{
                ...state,
                videogames:action.payload,
                allGames:action.payload     //es necesario?
            };

        case FILTER_BY_GENRE:       //revisar esto, no funca bien
            const allGames=state.allGames
            const genreFilteres=action.payload==='All'? allGames:allGames.filter(el=>el.status===action.payload)
            return{
                ...state,
                videogames:genreFilteres
            };
        
        case FILTER_ORIGIN:    //revisar esto tambien
            const createdFilteres=action.payload==='All'? state.allGames:state.allGames.filter(el=>el.created===action.payload)
            return{
                ...state,
                videogames:createdFilteres
            }
        
        case ORDER_BY_NAME:
            let sortedArr=action.payload==='asc'?
                state.videogames.sort(function(a,b){    //compara y ordena de forma asc
                    if(a.name<b.name) return -1
                    if(a.name>b.name) return 1
                    return 0
                }):
                state.videogames.sort(function(a,b){    //compara y ordena de forma desc
                    if(a.name<b.name) return 1
                    if(a.name>b.name) return -1
                    return 0
                })
            return{
                ...state,
                videogames:sortedArr
            }

        case ORDER_BY_RATING:

        default:
            return state;
    }
}

export default rootReducer