import React from 'react';
import { Link } from 'react-router-dom';

const BoardgameCard = ({ name, image, price, quantity, id }) => {
  return (
    <div className='card text-center card-listed mb-4'>
      <img src={image} alt='BOARDGAME' className='card-img-top' />
      <div className='card-body p-2'>
        <h5 className='card-title mb-2'>{name}</h5>
        <h6 className='card-subtitle text-muted mb-2 mt-0'>
          {quantity === 0 ? 'Out of Stock' : `Stock: ${quantity}`}
        </h6>
        <p className='card-text mb-2'>Price: {price}€</p>
        <Link to={'/boardgames/list/' + id} className='btn btn-primary'>
          Details
        </Link>
      </div>
    </div>
  );
};

export default BoardgameCard;
