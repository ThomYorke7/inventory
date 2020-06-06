import React, { useState } from 'react';
import axios from 'axios';

const PuzzleAdd = () => {
  const [name, setName] = useState('');
  const [pieces, setPieces] = useState(500);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('pieces', pieces);
    data.append('image', image);
    data.append('price', price);
    data.append('quantity', quantity);

    axios
      .post('/puzzles/add', data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log({ message: err.message }));

    window.location = '/puzzles';
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
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
        <button type='submit' className='btn btn-primary my-3'>
          Add
        </button>
      </div>
    </form>
  );
};

export default PuzzleAdd;
