import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BoardgameCard from './boardgame-card';

const BoardgamesList = () => {
  const [boardgames, setBoardgames] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/boardgames/')
      .then((response) => {
        setBoardgames(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className='card-deck'>
        {boardgames.map((boardgame) => (
          <BoardgameCard
            name={boardgame.name}
            price={boardgame.price}
            quantity={boardgame.quantity}
            key={boardgame._id}
            id={boardgame._id}
          />
        ))}
      </div>

      <Link to='/boardgames/add'>Add a Game</Link>
    </div>
  );
};

export default BoardgamesList;
