import React, { useState } from 'react';
import axios from 'axios';

const AccessoryAdd = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('sleeves');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('category', category);
    data.append('image', image);
    data.append('price', price);
    data.append('quantity', quantity);

    axios
      .post('/accessories/add', data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log({ message: err.message }));

    window.location = '/accessories';
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
        <button type='submit' className='btn btn-primary my-3'>
          Add
        </button>
      </div>
    </form>
  );
};

export default AccessoryAdd;
