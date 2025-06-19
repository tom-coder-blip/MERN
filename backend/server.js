//This code sets up the Express server for your backend Movie Reviews app

import express from 'express' //A framework used to build the web server and APIs.
import cors from 'cors' //Middleware that allows your backend to accept requests from other origins
import movies from './api/movies.route.js' // Imports the router that contains all the routes related to movies 

const app = express() //create the server

// Attach the cors and express.json middleware that express will use

app.use(cors()) //Enables Cross-Origin Resource Sharing so your frontend can talk to the backend without being blocked by the browser.
app.use(express.json()) // Parses incoming requests with JSON payloadss

app.use("/api/v1/movies", movies) //any request that starts with /api/v1/movies should be handled by the movies router
app.use('*', (req,res)=>{
res.status(404).json({error: "not found"})
}) //This is a fallback route.
export default app