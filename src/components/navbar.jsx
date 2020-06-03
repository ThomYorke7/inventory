import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg sticky-top'>
      <Link to='/' className='navbar-brand'>
        BoardGameNerd
      </Link>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link to='/boardgames' className='nav-link'>
              Boardgames
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/puzzles' className='nav-link'>
              Puzzles
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/accessories' className='nav-link'>
              Accessories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
