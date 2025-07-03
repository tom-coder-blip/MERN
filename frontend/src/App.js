import './App.css';
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";
import { Nav, Navbar, Button } from 'react-bootstrap';
import Contact from "./components/contact";
import "./NavbarStyles.css";


function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user)
  }
  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="shadow-sm px-3 custom-navbar">
        <Navbar.Brand className="fw-bold custom-brand">RateMyFilm</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/movies" className="nav-link-custom">
              Movies
            </Nav.Link>

            <Button as={Link} to="/contact" variant="outline-primary" className="ms-2">
              Contact
            </Button>

            {user ? (
              <Button variant="outline-danger" onClick={logout} className="ms-2">
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="outline-primary" className="ms-2">
                Login
              </Button>

            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        {/* what displays is the movies list */}
        <Route exact path={["/", "/movies"]} component={MoviesList} />

        {/* adding a review */}
        <Route path="/movies/:id/review" render={(props) =>
          <AddReview {...props} user={user} />
        } />

        {/* finding specific movie */}
        <Route path="/movies/:id/" render={(props) =>
          <Movie {...props} user={user} />
        } />

        {/* login page */}
        <Route path="/login" render={(props) =>
          <Login {...props} login={login} />
        } />

        {/* contact page */}
        <Route path="/contact" component={Contact} />
      </Switch>

    </div>
  );
}

export default App;