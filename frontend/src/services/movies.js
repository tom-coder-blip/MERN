//This file defines a service class (MovieDataService) to handle all API requests related to movies. 
// Instead of writing HTTP calls (e.g. axios.get(...)) directly in your React components, 
// this class centralizes all backend communication in one place.

import axios from "axios";

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`https://mern-app-1hlo.onrender.com/api/v1/movies?page=${page}`)
    }
    get(id) {
        return axios.get(`https://mern-app-1hlo.onrender.com/api/v1/movies/id/${id}`)
    }
    // find(title) {
    //     return axios.get(
    //         `http://localhost:5000/api/v1/movies?title=${title}`
    //     )
    // }
    find(query, by = "title", page = 0, rating) {
        return axios.get(
            `https://mern-app-1hlo.onrender.com/api/v1/movies?${by}=${query}&page=${page}&rating=${rating}`
        )
    }
    createReview(data) {
        return axios.post("https://mern-app-1hlo.onrender.com/api/v1/movies/review", data)
    }
    updateReview(data) {
        return axios.put("https://mern-app-1hlo.onrender.com/api/v1/movies/review", data)
    }
    deleteReview(id, userId) {
        return axios.delete(
            "https://mern-app-1hlo.onrender.com/api/v1/movies/review",
            { data: { review_id: id, user_id: userId } }
        )
    }
    getRatings() {
        return axios.get("https://mern-app-1hlo.onrender.com/api/v1/movies/ratings")
    }
}

const movieDataService = new MovieDataService();

export default movieDataService;