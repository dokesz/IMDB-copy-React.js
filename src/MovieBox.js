import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const MovieBox = ({ Poster, Title, imdbID, Year }) => {
  const [click, setClick] = useState(false);
  const [movieInfo, setMovieInfo] = useState([]);

  const handleShow = () => {setClick(true); movieData(imdbID)};
  const handleClose = () => setClick(false);

  const placeholder = `https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png`;

  async function movieData(imdbID) {
    const result = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=643f294a`
    );
    const movieDetails = await result.json();
    if(movieDetails.Poster === "N/A"){
      movieDetails.Poster = placeholder;
      console.log(movieDetails.Poster);
    }
    setMovieInfo(movieDetails);
  }

  return (
    <div className="col-sm-3 text-center">
      <div className="card text-center mb-3 mt-3">
        <img className="card-img-top" src={Poster} alt=""/>
        <div className="card-body">
          <h5>{Title}</h5>
          <button className="btn btn-secondary" onClick={handleShow} >
            Show more
          </button>
          <Modal show={click} onHide={handleClose} className="text-center">
            <Modal.Body>
              <img className="card-img-top" src={movieInfo.Poster} alt="" />
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
