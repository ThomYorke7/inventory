import React from 'react';

const AccessoryAdd = () => {
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type='text' className='form-control' name='name' required />
        <label htmlFor='pieces'>Category</label>
        <select name='pieces' id='pieces' className='form-control'>
          <option value='sleeves'>Sleeves</option>
          <option value='dices'>Dices</option>
          <option value='playmats'>Playmats</option>
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

export default AccessoryAdd;
