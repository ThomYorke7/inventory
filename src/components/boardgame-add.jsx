import React, { useState } from 'react';
import axios from 'axios';

const BoardgameAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [duration, setDuration] = useState(0);
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
    const newBoardgame = {
      name,
      description,
      author,
      publisher,
      duration,
      minPlayers,
      maxPlayers,
      price,
      quantity,
    };

    axios
      .post('http://localhost:5000/boardgames/add', newBoardgame)
      .then((res) => console.log(res.data));

    window.location = '/boardgames';
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-control'
          name='name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          className='form-control'
          name='description'
          rows='3'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor='author'>Author</label>
        <input
          type='text'
          className='form-control'
          name='author'
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor='publisher'>Publisher</label>
        <input
          type='text'
          className='form-control'
          name='publisher'
          required
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <label htmlFor='duration'>Duration</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='duration'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor='min-players'>Min. Players</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='min-players'
          required
          value={minPlayers}
          onChange={(e) => setMinPlayers(e.target.value)}
        />
        <label htmlFor='max-players'>Max. Players</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='max-players'
          required
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(e.target.value)}
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='price'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor='quantity'>Quantity</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </form>
  );
};

export default BoardgameAdd;
