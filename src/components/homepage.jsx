import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col d-flex justify-content-center'>
          <Link to='/boardgames'>BOARDGAMES</Link>
        </div>
        <div className='col d-flex justify-content-center'>
          <Link to='/puzzles'>PUZZLES</Link>
        </div>
        <div className='col d-flex justify-content-center'>
          <Link to='/accessories'>ACCESSORIES</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
