const axios=require('axios')
const {Op}=require('sequelize')

const {Videogame, Genres} = require('../../db')

const {API_KEY}=process.env

const url=`https://api.rawg.io/api/games?key=${API_KEY}`

//Realizo la peticion de traer N juegos de la API
const getNGamesFromAPI=async(num,name)=>{    //recibo el numero de juegos que se desean mostrar
    const paginas=Math.ceil(num/20);               //cada pagina de la API muestran 20 juegos, realizo la division para saber la cantidad de paginas que se van a recorrer
    const games=[];                     //creo un array donde voy a pushear los juegos obtenidos
    reqs=[]                             //creo un array para guardar las peticiones a la API

    for(let i=1;i<=paginas;i++){
        reqs.push(axios.get(`${url}&search=${name}&page=${i}`)) //realizo la peticion de los juegos a la API
    }
    
    const data=await axios.all(reqs); //recibo la info de los juegos de la API
    
    data.map((el)=>{games.push(...el.data.results)})       //ingreso a los resultados de la pagina de la API y uno los diferentes arrays

    const info= games.map((el)=>{           //solicito la info que necesito solamente
        return{
            id:el.id,
            name:el.name,   
            image:el.background_image,
            platforms: el.platforms?.map(el=>el.platform.name),
            releaseDate:el.released,
            rating:el.rating,
            genre:el.genres.map(el=>el.name) 
        };
    }).flat(); //para unir los arrays de las distintas paginas

    return info; //devuelvo un array de objetos con todos los juegos que se solicitan de la API
}

//Realizo la peticion de traer los juegos de la API y de la base de datos, si rebibe un name, trae solo los coincidentes
const getAllVideogames=async(name)=>{

    let [resDB, resAPI]=await Promise.all([      //guardo todos los juegos en un ARRAY
        Videogame.findAll({      //Traigo los juegos que se encuentren en la base de datos
            where:{
                name:{[Op.iLike]: `${name}`}
            },
            attributes:['id','name','image','rating'],      //los atributos que voy a mostrar en la card
            include:{
                model: Genres,
                trough:{attributes:[]}
            }
        }),
        getNGamesFromAPI(100,name)   //traigo 100 juegos de la API
    ])

    resDB=resDB?.map((g) => g.toJSON())     //si hay juegos en la DB los convierto a un formato .JSON
    
    const allGames=[...resDB,...resAPI]             //creo un array con todos los juegos

    if(name){                                   //si se busca por nombre
        const first15=allGames.slice(0,15);        //devuelvo los primeros 15 cortando el array
        return first15
    }

    if(!allGames.length){                       //si no se encuentra el nombre del juego
        throw new Error(`No se encontro el juego ${name}`)      //devuelvo un error
    }
    
    return allGames     //retorno un ARRAY con todos los juegos
}

module.exports={
    getAllVideogames
}


    
    