import React from 'react';
import { Link } from 'react-router-dom';

const BoardgamesList = () => {
  return (
    <div>
      <p>You are in the Boardgames List</p>
      <Link to='/boardgames/add'>Add a Game</Link>
    </div>
  );
};

export default BoardgamesList;
