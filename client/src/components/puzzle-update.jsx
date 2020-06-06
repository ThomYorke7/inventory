import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const PuzzleUpdate = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [pieces, setPieces] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    axios
      .get('/puzzles/' + props.match.params.id)
      .then((res) => {
        setId(res.data._id);
        setName(res.data.name);
        setPieces(res.data.pieces);
        setImage(res.data.image);
        setPrice(res.data.price);
        setQuantity(res.data.quantity);
      })
      .catch((err) => console.log({ message: err.message }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = (e) => {
    e.preventDefault();
    const editPassword = document.getElementById('editPassword').value;
    if (editPassword === process.env.REACT_APP_PASSWORD) {
      setPasswordError(false);

      const data = new FormData();

      data.append('name', name);
      data.append('pieces', pieces);
      data.append('image', image);
      data.append('price', price);
      data.append('quantity', quantity);

      axios
        .patch('http://localhost:5000/puzzles/' + id, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log({ message: err.message }));

      window.location = '/puzzles/list/' + id;
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
        <label htmlFor='pieces'>Pieces</label>
        <select
          name='pieces'
          id='pieces'
          className='form-control'
          value={pieces}
          onChange={(e) => setPieces(e.target.value)}
        >
          <option value='500'>500</option>
          <option value='1000'>1000</option>
          <option value='1500'>1500</option>
          <option value='2000'>2000</option>
        </select>
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          name='image'
          className='form-control-file'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          min='0'
          step='0.01'
          className='form-control'
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
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
            to={'/puzzles/list/' + id}
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

export default PuzzleUpdate;
