import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// ADDED: track total movies
const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");
  const [totalMovies, setTotalMovies] = useState(0);

  //Whenever the user switches to a different search mode, reset the page to 0.
  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveNextPage();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("Title:", searchTitle);
    console.log("Ratings:", ratings)
  }, [searchTitle, ratings]);

  //Depending on the current search mode, get the next page results properly.
  const retrieveNextPage = () => {
    if (currentSearchMode === 'findByTitle') findByTitle();
    else if (currentSearchMode === 'findByRating') findByRating();
    else retrieveMovies();
  };

  const retrieveMovies = () => {
    setCurrentSearchMode("");
    MovieDataService.getAll(currentPage)
      .then(response => {
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
        setTotalMovies(response.data.total_results);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchRating = (e) => {
    setSearchRating(e.target.value);
  };

  //Pass the page number when searching:
  const find = (query, by) => {
    MovieDataService.find(query, by, currentPage)
      .then(response => {
        setMovies(response.data.movies);
        setEntriesPerPage(response.data.entries_per_page);
        setTotalMovies(response.data.total_results);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  const clearForm = () => {
    setSearchTitle("");
    setSearchRating("All Ratings");
    setCurrentSearchMode("");
    setCurrentPage(0);
    setMovies([]);
  };

  return (
    <div className="App">
      
      <Container>
        <Form>
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
                className="mt-2"
              >
                Search
              </Button>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={searchRating}
                  onChange={onChangeSearchRating}
                >
                  {ratings.map((rating, index) => (
                    <option key={index} value={rating}>{rating}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByRating}
                className="mt-2"
              >
                Search
              </Button>
            </Col>

            <Col md={4}>
              <Button
                variant="danger"
                type="button"
                onClick={clearForm}
                className="mt-2"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className="mt-4">
          {movies.map((movie) => (
            <Col key={movie._id} md={4} className="mb-4">
              <Card style={{ width: '18rem' }}>
                <Card.Img src={movie.poster + "/100px180"} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Rating: {movie.rated}</Card.Text>
                  <Card.Text>{movie.plot}</Card.Text>
                  <Link to={"/movies/" + movie._id}>View Reviews</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <p>Showing page: {currentPage + 1}</p>
          <p>
            {
              totalMovies - (currentPage + 1) * entriesPerPage > 0
                ? `${totalMovies - (currentPage + 1) * entriesPerPage} movies remaining`
                : "No more movies remaining"
            }
          </p>

          <Button
            variant="link"
            onClick={() => {
              if ((currentPage + 1) * entriesPerPage < totalMovies) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={(currentPage + 1) * entriesPerPage >= totalMovies}
          >
            {(currentPage + 1) * entriesPerPage >= totalMovies
              ? "No More Results"
              : `Get next ${entriesPerPage} results`}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MoviesList;