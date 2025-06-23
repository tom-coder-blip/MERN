// a Controller in a Node.js Express web app for a movie database.
// It receives requests from users, calls the right functions in the DAO (which talks to the database), and then sends back a response (usually in JSON format).
import MoviesDAO from '../dao/moviesDAO.js' //interact with the database 

//handles what should happen when the client makes API requests about movies.
export default class MoviesController{

    //This function handles a request to get a list of movies
    static async apiGetMovies(req,res,next){
        //displays whats typed in or 20 movies/page
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        //displays whats typed in or page 0
        const page = req.query.page ? parseInt(req.query.page) : 0

        //whats typed is pushed to filters object, updating values
        let filters = {} 
        //If the URL includes ?rated=PG, it will filter by rating.
        if(req.query.rated){            
            filters.rated = req.query.rated
        } 
        //If ?title=Batman, it will filter by movie title.
        else if(req.query.title){            
            filters.title = req.query.title            
        }
         
        //links to movies DAO to access filters
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage})
        
        //response displays in json format
        let response ={
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response) 
    }
    static async apiGetMovieById(req,res, next){
        try{
            //look for parameters, whats typed at the end of the url
            let id = req.params.id || {}
            //id is the identifier
            let movie = await MoviesDAO.getMovieById(id)
            //error handling if movie id isn't found in movie object
            if(!movie){ 
                res.status(404).json({ error: "not found"})
                return
            }
            res.json(movie)
        }
        catch(e){
            //error message
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetRatings(req,res,next){
        try{ 
            //respond with property in json format
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        }
        catch(e){
            //error message
            console.log(`api,${e}`)
            res.status(500).json({error: e})
        }
    }

}