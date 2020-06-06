import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const DeleteForm = ({ item, query, setDeleteModal }) => {
  const [passwordError, setPasswordError] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    const inputPassword = document.getElementById('inputPassword').value;
    if (inputPassword === process.env.REACT_APP_PASSWORD) {
      setPasswordError(false);
      axios
        .delete(`/${query}/` + item._id)
        .then((response) => console.log(response.data))
        .catch((err) => console.log({ message: err.message }));
      window.location = `/${query}`;
    } else if (inputPassword !== process.env.REACT_APP_PASSWORD) {
      setPasswordError(true);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={(e) => handleDelete(e)}>
        <div className='form-group mt-3 w-50'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            className='form-control'
            name='password'
            id='inputPassword'
            required
          />
        </div>
        <button
          className='btn btn-primary mr-2'
          onClick={() => setDeleteModal(false)}
        >
          Close
        </button>
        <button className='btn btn-danger' type='submit'>
          Confirm
        </button>
      </form>
      {passwordError === true && (
        <div className='alert alert-danger mt-3 w-50' role='alert'>
          Incorrect Password
        </div>
      )}
    </React.Fragment>
  );
};

export default DeleteForm;
