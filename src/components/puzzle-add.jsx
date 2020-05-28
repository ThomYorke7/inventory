import React from 'react';

const PuzzleAdd = () => {
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type='text' className='form-control' name='name' required />
        <label htmlFor='pieces'>Pieces</label>
        <select name='pieces' id='pieces' className='form-control'>
          <option value='500'>500</option>
          <option value='1000'>1000</option>
          <option value='1500'>1500</option>
          <option value='2000'>2000</option>
        </select>
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

export default PuzzleAdd;
