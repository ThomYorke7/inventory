import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const BoardgameUpdate = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [duration, setDuration] = useState(0);
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    axios
      .get('/api/boardgames/' + props.match.params.id)
      .then((response) => {
        setId(response.data._id);
        setName(response.data.name);
        setDescription(response.data.description);
        setYear(response.data.year);
        setImage(response.data.image);
        setAuthor(response.data.author);
        setPublisher(response.data.publisher);
        setDuration(response.data.duration);
        setMinPlayers(response.data.minPlayers);
        setMaxPlayers(response.data.maxPlayers);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = (e) => {
    e.preventDefault();
    const editPassword = document.getElementById('editPassword').value;
    if (editPassword === process.env.REACT_APP_PASSWORD) {
      setPasswordError(false);
      const data = new FormData();

      data.append('name', name);
      data.append('description', description);
      data.append('year', year);
      data.append('image', image);
      data.append('author', author);
      data.append('publisher', publisher);
      data.append('duration', duration);
      data.append('minPlayers', minPlayers);
      data.append('maxPlayers', maxPlayers);
      data.append('price', price);
      data.append('quantity', quantity);

      axios
        .patch('/api/boardgames/' + id, data)
        .then((res) => console.log(res.data));

      window.location = '/boardgames/list/' + id;
    } else if (editPassword !== process.env.REACT_APP_PASSWORD) {
      setPasswordError(true);
    }
  };

  return (
    <form onSubmit={(e) => handleUpdate(e)} encType='multipart/form-data'>
      <div className='form-group add-form'>
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
        <label htmlFor='year'>Year</label>
        <input
          type='number'
          min='1900'
          className='form-control'
          name='year'
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          name='image'
          className='form-control-file'
          onChange={(e) => setImage(e.target.files[0])}
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
          step='0.01'
          className='form-control'
          name='price'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor='quantity'>Quantity</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor='editPassword'>Insert Password</label>
        <input
          type='password'
          required
          id='editPassword'
          name='editPassword'
          className='form-control'
        />
        {passwordError === true && (
          <div className='alert alert-danger mt-3 mb-0' role='alert'>
            Incorrect Password
          </div>
        )}
        <div className='btn-ctn d-flex my-3'>
          <Link
            to={'/boardgames/list/' + id}
            className='btn btn-primary w-50 mr-3'
          >
            Previous Page
          </Link>
          <button type='submit' className='btn btn-primary w-50'>
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default BoardgameUpdate;
