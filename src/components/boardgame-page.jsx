import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteForm from './delete-form';

const BoardgamePage = (props) => {
  const [boardgame, setBoardgame] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/boardgames/' + props.match.params.id)
      .then((response) => {
        setBoardgame(response.data);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   const inputPassword = document.getElementById('inputPassword').value;
  //   if (inputPassword === process.env.REACT_APP_PASSWORD) {
  //     setPasswordError(false);
  //     axios
  //       .delete('http://localhost:5000/boardgames/' + boardgame._id)
  //       .then((response) => console.log(response.data))
  //       .catch((err) => console.log({ message: err.message }));
  //     window.location = '/boardgames';
  //   } else if (inputPassword !== process.env.REACT_APP_PASSWORD) {
  //     setPasswordError(true);
  //   }
  // };

  // const DeleteForm = () => {
  //   return (
  //     <React.Fragment>
  //       <form onSubmit={(e) => handleDelete(e)}>
  //         <div className='form-group mt-3 w-50'>
  //           <label htmlFor='password'>Password:</label>
  //           <input
  //             type='password'
  //             className='form-control'
  //             name='password'
  //             id='inputPassword'
  //             required
  //           />
  //         </div>
  //         <button
  //           className='btn btn-primary mr-2'
  //           onClick={() => setDeleteModal(false)}
  //         >
  //           Close
  //         </button>
  //         <button className='btn btn-danger' type='submit'>
  //           Confirm
  //         </button>
  //       </form>
  //       {passwordError === true && (
  //         <div className='alert alert-danger mt-3 w-50' role='alert'>
  //           Incorrect Password
  //         </div>
  //       )}
  //     </React.Fragment>
  //   );
  // };

  return (
    <React.Fragment>
      <div className='card border-0'>
        <div className='row no-gutters mt-4'>
          <div className='col-lg-5'>
            <img
              src={'http://localhost:5000/' + boardgame.image}
              alt='BOARDGAME'
              className='card-img'
            />
          </div>
          <div className='col-lg-7'>
            <div className='card-body'>
              <h2 className='card-title'>{boardgame.name}</h2>
              <p className='card-text'>Description: {boardgame.description}</p>
              <p className='card-text'>Year: {boardgame.year}</p>
              <p className='card-text'>Author(s): {boardgame.author}</p>
              <p className='card-text'>Publisher: {boardgame.publisher}</p>
              <p className='card-text'>Duration: {boardgame.duration} min.</p>
              <p className='card-text'>
                Min. Players: {boardgame.minPlayers} | Max. Players:{' '}
                {boardgame.maxPlayers}
              </p>
              <p className='card-text'>Price: {boardgame.price}€</p>
              <p className='card-text'>
                {boardgame.quantity > 0
                  ? `Stock: ${boardgame.quantity}`
                  : 'Out of Stock'}{' '}
              </p>
            </div>
            <div className='card-body py-0'>
              <Link
                to={'/boardgames/edit/' + boardgame._id}
                className='btn btn-primary mr-2'
              >
                Edit
              </Link>

              <button
                className='btn btn-danger'
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </button>
              {deleteModal && (
                <DeleteForm
                  item={boardgame}
                  query='boardgames'
                  setDeleteModal={setDeleteModal}
                ></DeleteForm>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BoardgamePage;
