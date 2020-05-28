import React from 'react';

const BoardgameAdd = () => {
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type='text' className='form-control' name='name' required />
        <label htmlFor='description'>Description</label>
        <textarea className='form-control' name='description' rows='3' />
        <label htmlFor='author'>Author</label>
        <input type='text' className='form-control' name='author' required />
        <label htmlFor='publisher'>Publisher</label>
        <input type='text' className='form-control' name='publisher' required />
        <label htmlFor='duration'>Duration</label>
        <input type='number' min='0' className='form-control' name='duration' />
        <label htmlFor='min-players'>Min. Players</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='min-players'
          required
        />
        <label htmlFor='max-players'>Max. Players</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='max-players'
          required
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='price'
          required
        />
        <label htmlFor='quantity'>Quantity</label>
        <input type='number' min='1' className='form-control' name='quantity' />
      </div>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </form>
  );
};

export default BoardgameAdd;
