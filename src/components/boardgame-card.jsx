import React from 'react';
import { Link } from 'react-router-dom';

const BoardgameCard = ({ name, image, price, quantity, id }) => {
  return (
    <div className='card'>
      <img
        src={'http://localhost:5000/' + image}
        alt='BOARDGAME'
        className='card-img-top'
      />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <h6 className='card-subtitle text-muted'>
          {quantity === 0 ? 'Out of stock' : `Stock: ${quantity}`}
        </h6>
        <p className='card-text'>{price}€</p>

        <Link to={'/boardgames/list/' + id}>Details</Link>
      </div>
    </div>
  );
};

export default BoardgameCard;
