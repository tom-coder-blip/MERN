// This file connects to the MongoDB movies collection.
// It provides functions to get movie data from the database.
// DAO = Data Access Object
// Allows interaction between the app and database

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let movies //This will hold a reference to the movies collection in MongoDB

export default class MoviesDAO {
    static async injectDB(conn) {  //Initialize a connection to the movies collection 
        if (movies) {
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies')
        }
        catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    //Finds one movie by its ID.
    static async getMovieById(id) {
        try {
            //use aggregate to provide a sequence of data aggregation operations                             
            return await movies.aggregate([
                {   //look for movie doc that matches specified id
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                // joins id field from movie doc to movie_id in reviews collection
                {
                    $lookup:
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews',
                    }
                } //Then, joins (links) all the reviews that belong to that movie.      
            ]).next()
        }
        catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }


    static async getMovies({// default filter
        filters = null, //Accepts optional filters (title or rated)
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } }
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }

        let cursor
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }

    //Returns all unique movie ratings (e.g., G, PG, PG-13, R) from the collection.
    static async getRatings() {
        let ratings = []
        try {
            //look for all possible ratings for all movies in movie object
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch (e) {
            //error message
            console.error(`unable to get ratings, ${e}`)
            return ratings
        }
    }

        static async addMovie(movieData) {
        try {
            return await movies.insertOne(movieData)
        } catch (e) {
            console.error(`Unable to add movie: ${e}`)
            return { error: e }
        }
    }

}