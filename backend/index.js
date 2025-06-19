//main entry point of a Node.js backend application for a Movie Reviews project.
//This is the file that connects to MongoDB and starts the server.

import app from './server.js' //This imports the Express app (your backend web server) from server.js.
import mongodb from "mongodb" // Imports the official MongoDB client to connect to your MongoDB database.
import dotenv from "dotenv" //Loads environment variables from a .env file (e.g., DB connection URI, PORT).
//Data Access Objects that contain logic for interacting with the movies and reviews collections
import MoviesDAO from './dao/moviesDAO.js' 
import ReviewsDAO from './dao/reviewsDAO.js' 

//sets up the server and database connection.
async function main(){        
 
    dotenv.config()    
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI) //create a connection to your database.
    const port = process.env.PORT || 8000 //Tries to read the port from .env, otherwise defaults to 8000.
 
    try {
        // Connect to the MongoDB cluster
        await client.connect()
        await MoviesDAO.injectDB(client) //Initialize the DAOs
        await ReviewsDAO.injectDB(client)

        //Start the Express Server
        app.listen(port, () =>{
            console.log('server is running on port:'+port);        
        })

    } catch (e) {
        console.error(e);        
        process.exit(1)
    } 
}

main().catch(console.error); //Executes the main() function and catches any errors that weren't handled inside main().