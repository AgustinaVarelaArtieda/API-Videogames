import { FILTER_BY_GENRE, FILTER_ORIGIN, GET_GAMES, GET_GAME_DETAILS, GET_GENRES, ORDER_BY_NAME, ORDER_BY_RATING, POST_GAME, SEARCH_GAMES_NAME } from "./typeActions"

const initialState={       //ESTADOS GLOBALES
    videogames:[],
    allGames:[],
    genres:[],
    detail:[]
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_GAMES:
            return{
                ...state,
                videogames:action.payload,
                allGames:action.payload     
            };

        case SEARCH_GAMES_NAME:
            return{
                ...state,
                videogames:action.payload
            }
            
        case GET_GAME_DETAILS:
            return{
                ...state,
                detail: action.payload
            }

        case GET_GENRES:
            return{
                ...state,
                genres:action.payload
            }

        case POST_GAME:
            return{
                ...state,
            }

        case FILTER_BY_GENRE:       //revisar esto, no funca bien
            const allGames=state.allGames
            const genreFilteres=action.payload==='All'? allGames:allGames.filter(el=>el.status===action.payload)
            return{
                ...state,
                videogames:genreFilteres
            };

            // case GET_GAME_GENRE: {
            //     const { payload: { genre, videogames } } = action;
            //     const gamesByGenre = videogames.filter(game => game.genres.filter(el => el.name === genre).length);
    
            //     return{
            //         ...state,
            //         videogames: gamesByGenre,
            //     }
            // }
        
        case FILTER_ORIGIN:    //revisar esto tambien
            let originFilteres= [...(state.allGames.length? state.allGames : state.videogames)]
            
            if(action.payload==='All'){
                originFilteres=[...state.videogames]
            }else if(action.payload==='DB'){
                originFilteres=state.videogames.filter((game)=>isNaN(game.id))
            }else if(action.payload==='API'){
                originFilteres=state.videogames.filter((game)=>!isNaN(game.id))
            }
            return{
                ...state,
                videogames: originFilteres
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
            let ratingArr=action.payload==='asc'?
                state.videogames.sort(function(a,b){    //compara y ordena de forma asc
                    if(a.rating<b.rating) return -1
                    if(a.rating>b.rating) return 1
                    return 0
                }):
                state.videogames.sort(function(a,b){    //compara y ordena de forma desc
                    if(a.rating<b.rating) return 1
                    if(a.rating>b.rating) return -1
                    return 0
                })
            return{
                ...state,
                videogames:ratingArr
            }
        

        default:
            return state;
    }
}

export default rootReducer