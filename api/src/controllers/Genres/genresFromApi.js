const axios=require('axios');

const {Genres} = require('../../db');

const {API_KEY}=process.env

const url=`https://api.rawg.io/api/genres?key=${API_KEY}`

const genre_API=async()=>{   
    
    const genresExistingInDB= await Genres.findAll()        //Busco y traigo los generos que existen en mi DB

    const namesGenres=genresExistingInDB.map(el=>el.name);  //Extraigo solo los nombres de los generos y los guardo en un ARRAY

    if(!genresExistingInDB.length){     //si mi DB esta vacia
        
        const genresAPI=await axios.get(url)

        const {data:{results}}=genresAPI
    
        await results.map(el=>{
            Genres.create({name:el.name});          //aqui agrego esos generos a la DB
            namesGenres.push(el.name);       //pusheo los nombres de los generos al ARRAY que retorno
        });
    }

    return namesGenres
}

module.exports=genre_API