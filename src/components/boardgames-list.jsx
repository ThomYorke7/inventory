import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BoardgameCard from './boardgame-card';
import { IoMdAddCircle } from 'react-icons/io';

const BoardgamesList = () => {
  const [boardgames, setBoardgames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/boardgames/')
      .then((response) => {
        setBoardgames(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='position-relative'>
      <Link to='/boardgames/add' className='add-link p-2'>
        <IoMdAddCircle className='mr-1'></IoMdAddCircle>
        <span className='d-none d-md-inline'>Add a Game</span>
      </Link>
      {loading && (
        <div className='spinner-border text-warning' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      <div className='card-deck'>
        {boardgames.map((boardgame) => (
          <BoardgameCard
            name={boardgame.name}
            image={boardgame.image}
            price={boardgame.price}
            quantity={boardgame.quantity}
            key={boardgame._id}
            id={boardgame._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardgamesList;
