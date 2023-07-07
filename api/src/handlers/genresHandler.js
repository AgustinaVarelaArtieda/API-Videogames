const genre_API=require('../controllers/Genres/genresFromApi')

const getGenresApi=async(req,res)=>{

    try {   
        const allGenres= await genre_API()
    
        res.status(200).json(allGenres)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = getGenresApi