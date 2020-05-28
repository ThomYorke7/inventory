import React from 'react';
import { Link } from 'react-router-dom';

const BoardgameCard = ({ name, price, quantity, id }) => {
  return (
    <div className='card'>
      <img src='#' alt='BOARDGAME' className='card-img-top' />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <h6 className='card-subtitle text-muted'>
          {quantity === 0 ? 'Out of stock' : `Stock: ${quantity}`}
        </h6>
        <p className='card-text'>{price}€</p>

        <Link to={'/boardgames/' + id}>Details</Link>
      </div>
    </div>
  );
};

export default BoardgameCard;
