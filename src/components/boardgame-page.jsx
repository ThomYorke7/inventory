import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardgamePage = (props) => {
  const [boardgame, setBoardgame] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/boardgames/' + props.match.params.id)
      .then((response) => setBoardgame(response.data))
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  return (
    <div className='card'>
      <div className='row no-gutters'>
        <div className='col-md-4'>
          <img src='#' alt='BOARDGAME' className='card-img' />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{boardgame.name}</h5>
            <p className='card-text'>{boardgame.description}</p>
            <p className='card-text'>Author(s): {boardgame.author}</p>
            <p className='card-text'>Publisher: {boardgame.publisher}</p>
            <p className='card-text'>Duration: {boardgame.duration} min.</p>
            <p className='card-text'>
              Min. Players: {boardgame.minPlayers} | Max. Players:
              {boardgame.maxPlayers}
            </p>
            <p className='card-text'>{boardgame.price}€</p>
            <p className='card-text'>Stock: {boardgame.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardgamePage;
