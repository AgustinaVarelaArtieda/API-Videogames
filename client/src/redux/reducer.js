import { FILTER_BY_GENRE, FILTER_ORIGIN, GET_GAMES, GET_GAME_DETAILS, GET_GENRES, ORDER_BY_NAME, ORDER_BY_RATING, POST_GAME, SEARCH_GAMES_NAME } from "./typeActions"

const initialState={       //ESTADOS GLOBALES
    videogames:[],
    allGames:[],
    genres:[],
    detail:[],
    sortOrder:'asc',
    filter:'All'
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

        case FILTER_BY_GENRE:       
            const allGames = state.allGames;
            const genreFiltered = action.payload === "All" ? allGames : allGames.filter(el => {
                if (Array.isArray(el.genres)) {
                    return el.genres.find(genre => genre.name === action.payload);
                } else {
                    return el.genres === action.payload;
                }
            });
            
            return{
                ...state,
                videogames:genreFiltered,
            };
        
        case FILTER_ORIGIN:    
            let originFilteres= [...state.videogames]
            let newFilter=action.payload
            
            if(action.payload==='All'){
                originFilteres=[...state.allGames]
            }else if(action.payload==='DB'){
                originFilteres=state.allGames.filter((game)=>isNaN(game.id))
            }else if(action.payload==='API'){
                originFilteres=state.allGames.filter((game)=>!isNaN(game.id))
            }
            return{
                ...state,
                videogames: originFilteres,
                filter:newFilter
            }
        
        case ORDER_BY_NAME:
            let sortedArr = [...state.videogames]; // Crear una copia del arreglo original
            let newSortOrder = action.payload; // Mantener el valor del orden seleccionado

            sortedArr.sort(function(a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return newSortOrder === 'asc' ? -1 : 1; 
                if (a.name.toLowerCase() > b.name.toLowerCase()) return newSortOrder === 'asc' ? 1 : -1;
                return 0;
            });
            console.log(newSortOrder)

            return {
                ...state,
                videogames: sortedArr,
                sortOrder: newSortOrder
            };

            case ORDER_BY_RATING:
                const selectedRating = action.payload;
                let sortedVideogames = [...state.videogames];

                sortedVideogames.sort((a, b) => {
                const ratingA = parseFloat(a.rating);
                const ratingB = parseFloat(b.rating);

                if (selectedRating === 'desc') {
                    return ratingA - ratingB;
                } else if (selectedRating === 'asc') {
                    return ratingB - ratingA;
                }
                    return 0;
                });

                return {
                    ...state,
                    videogames: sortedVideogames,
                    sortOrder: selectedRating
                }
            default:
                return state;
            }
        }
        
        export default rootReducer
