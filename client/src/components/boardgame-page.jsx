import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteForm from './delete-form';

const BoardgamePage = (props) => {
  const [boardgame, setBoardgame] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/boardgames/' + props.match.params.id)
      .then((response) => {
        setBoardgame(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      {loading && (
        <div className='text-center'>
          <div className='spinner-border text-warning m-5' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
      {loading === false && (
        <div className='card border-0'>
          <div className='row no-gutters mt-4 justify-content-center'>
            <div className='col-lg-5'>
              <img
                src={'http://localhost:5000/' + boardgame.image}
                alt='BOARDGAME'
                className='card-img'
              />
            </div>
            <div className='col-lg-6'>
              <div className='card-body'>
                <h2 className='card-title'>{boardgame.name}</h2>
                <p className='card-text'>
                  Description: {boardgame.description}
                </p>
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
      )}
    </React.Fragment>
  );
};

export default BoardgamePage;
