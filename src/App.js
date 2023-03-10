import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import "./App.css";
import MovieBox from "./MovieBox";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=643f294a`;
    const findMovie = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (data.Response === "True") {
          setMovies(data.Search);
          console.log(data.Search.length);
          if (data.Search.length === 10) {
            setShowBtn(true);
          } else setShowBtn(false);
          setShowAlert(false);
        } else if(query.length === 0) {
          setShowAlert(false);
        } else setShowAlert(true);
      } catch (e) {
        console.log(e);
      }
    };
    findMovie(url);
  }, [query, page]);


  //setMovies((prevData) => [...prevData, ...data.Search]);

  let changeHandler = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const setPageHandler = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Movie Bay</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search OMDb"
              className="me-2"
              aria-label="Search"
              name="query"
              value={query}
              onChange={changeHandler}
            />
            <Button type="button" variant="outline-primary">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      {showAlert && (
        <Alert className="text-center" variant="danger">
          <Alert.Heading>Nem létező film címet adott meg!</Alert.Heading>
        </Alert>
      )}
      <div className="container-fluid">
        <div className="row">
          {movies.map((movie) => (
            <MovieBox key={movie.imdbID} {...movie} />
          ))}
        </div>

        {showBtn && (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success"
              type="submit"
              onClick={setPageHandler}
            >
              More movies
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
