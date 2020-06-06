import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const AccessoryUpdate = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    axios
      .get('/api/accessories/' + props.match.params.id)
      .then((res) => {
        setId(res.data._id);
        setName(res.data.name);
        setCategory(res.data.category);
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
      data.append('category', category);
      data.append('image', image);
      data.append('price', price);
      data.append('quantity', quantity);

      axios
        .patch('/api/accessories/' + id, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log({ message: err.message }));

      window.location = '/accessories/list/' + id;
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
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor='pieces'>Category</label>
        <select
          name='category'
          className='form-control'
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value='sleeves'>Sleeves</option>
          <option value='dices'>Dices</option>
          <option value='playmats'>Playmats</option>
        </select>
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          className='form-control-file'
          name='image'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          min='0'
          step='0.01'
          className='form-control'
          name='price'
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <label htmlFor='quantity'>Quantity</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='quantity'
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
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
            to={'/accessories/list/' + id}
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

export default AccessoryUpdate;
