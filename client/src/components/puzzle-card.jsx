import React from 'react';
import { Link } from 'react-router-dom';

const PuzzleCard = ({ name, image, price, quantity, id }) => {
  return (
    <div className='card card-listed mb-4 text-center'>
      <img src={image} alt='PUZZLE' className='card-img-top' />
      <div className='card-body p-2'>
        <h5 className='card-title mb-2'>{name}</h5>
        <h6 className='card-subtitle text-muted mb-2 mt-0'>
          {quantity === 0 ? 'Out of Stock' : `Stock: ${quantity}`}
        </h6>
        <p className='card-text mb-2'>Price: {price}€</p>
        <Link to={'/puzzles/list/' + id} className='btn btn-primary'>
          Details
        </Link>
      </div>
    </div>
  );
};

export default PuzzleCard;
