import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import broken from '../broken.png';
require('dotenv').config();

const BoardgamePage = (props) => {
  const [boardgame, setBoardgame] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/boardgames/' + props.match.params.id)
      .then((response) => setBoardgame(response.data))
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  const handleDelete = (e) => {
    e.preventDefault();
    const inputPassword = document.getElementById('inputPassword').value;
    if (inputPassword === process.env.REACT_APP_PASSWORD) {
      setPasswordError(false);
      axios
        .delete('http://localhost:5000/boardgames/' + props.match.params.id)
        .then((response) => console.log(response.data))
        .catch((err) => console.log({ message: err.message }));
      window.location = '/boardgames';
    } else if (inputPassword !== process.env.REACT_APP_PASSWORD) {
      setPasswordError(true);
    }
  };

  const EditForm = () => {
    return (
      <form>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' name='password' />
        </div>
        <button
          className='btn btn-primary mr-2'
          onClick={() => setEditModal(false)}
        >
          Close
        </button>
        <button className='btn btn-primary' onClick={() => setEditModal(false)}>
          Edit
        </button>
      </form>
    );
  };

  const DeleteForm = () => {
    return (
      <React.Fragment>
        <form onSubmit={(e) => handleDelete(e)}>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
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
          <button className='btn btn-primary' type='submit'>
            Delete
          </button>
        </form>
        {passwordError === true && (
          <div className='alert alert-danger' role='alert'>
            Incorrect Password
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className='card'>
        <div className='row no-gutters'>
          <div className='col-md-6'>
            <img
              src={
                boardgame.image !== null
                  ? 'http://localhost:5000/' + boardgame.image
                  : broken
              }
              alt='BOARDGAME'
              className='card-img'
            />
          </div>
          <div className='col-md-6'>
            <div className='card-body'>
              <h5 className='card-title'>{boardgame.name}</h5>
              <p className='card-text'>{boardgame.description}</p>
              <p className='card-text'>Author(s): {boardgame.author}</p>
              <p className='card-text'>Publisher: {boardgame.publisher}</p>
              <p className='card-text'>Duration: {boardgame.duration} min.</p>
              <p className='card-text'>
                Min. Players: {boardgame.minPlayers} | Max. Players:{' '}
                {boardgame.maxPlayers}
              </p>
              <p className='card-text'>{boardgame.price}€</p>
              <p className='card-text'>Stock: {boardgame.quantity}</p>
            </div>
            <div className='card-body py-0'>
              <button
                className='btn btn-info mr-2'
                onClick={() => setEditModal(true)}
              >
                Edit
              </button>
              <button
                className='btn btn-danger'
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {editModal === true && <EditForm></EditForm>}
      {deleteModal === true && <DeleteForm></DeleteForm>}
    </React.Fragment>
  );
};

export default BoardgamePage;
