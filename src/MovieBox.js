import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const MovieBox = ({ Poster, Title, imdbID, Year }) => {
  const [click, setClick] = useState(false);
  const [movieInfo, setMovieInfo] = useState([]);

  const handleShow = () => {setClick(true); movieData(imdbID)};
  const handleClose = () => setClick(false);

  async function movieData(imdbID) {
    const result = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=643f294a`
    );
    const movieDetails = await result.json();
    setMovieInfo(movieDetails);
  }

  return (
    <div className="col-sm-3 text-center">
      <div className="card text-center mb-3 mt-3">
        <img className="card-img-top" src={Poster} alt="" />
        <div className="card-body">
          <h5>{Title}</h5>
          <button className="btn btn-secondary" onClick={handleShow} >
            Show more
          </button>
          <Modal show={click} onHide={handleClose} className="text-center">
            <Modal.Body>
              <img className="card-img-top" src={Poster} alt="" />
              <h5>{Title}</h5>
              <p>Year: {Year}</p>
              <p>IMDbID: {imdbID}</p>
              <p>Writer: {movieInfo.Writer}</p>
              <p>Plot: {movieInfo.Plot}</p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
