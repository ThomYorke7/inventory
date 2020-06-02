import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='row homepage-row justify-content-around'>
      <div className='col-lg p-0 board-banner-ctn'>
        <Link
          to='/boardgames'
          className='col-lg d-flex justify-content-center align-items-center board-banner'
        >
          BOARDGAMES
        </Link>
      </div>
      <div className='col-lg p-0'>
        <Link
          to='/puzzles'
          className='col-lg d-flex justify-content-center align-items-center puzzle-banner h-100'
        >
          PUZZLES
        </Link>
      </div>
      <div className='col-lg p-0'>
        <Link
          to='/accessories'
          className='col-lg d-flex justify-content-center align-items-center accessory-banner h-100'
        >
          ACCESSORIES
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
