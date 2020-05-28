import React from 'react';
import { Link } from 'react-router-dom';

const PuzzlesList = () => {
  return (
    <div>
      <p>You are in the Puzzles List</p>
      <Link to='/puzzles/add'>Add a Puzzle</Link>
    </div>
  );
};

export default PuzzlesList;
