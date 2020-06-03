import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='row justify-content-around h-100'>
      <div className='col-lg p-0 puzzle-banner-ctn'>
        <Link
          to='/puzzles'
          className='col-lg d-flex justify-content-center align-items-center puzzle-banner'
        >
          PUZZLES
        </Link>
      </div>
      <div className='col-lg p-0 board-banner-ctn'>
        <Link
          to='/boardgames'
          className='col-lg d-flex justify-content-center align-items-center board-banner'
        >
          BOARDGAMES
        </Link>
      </div>
      <div className='col-lg p-0 accessory-banner-ctn'>
        <Link
          to='/accessories'
          className='col-lg d-flex justify-content-center align-items-center accessory-banner'
        >
          ACCESSORIES
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
