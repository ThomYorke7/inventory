import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteForm from './delete-form';

const PuzzlePage = (props) => {
  const [puzzle, setPuzzle] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/puzzles/' + props.match.params.id)
      .then((res) => {
        setPuzzle(res.data);
        setLoading(false);
      })
      .catch((err) => console.log({ message: err.message }));
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
              <img src={'/' + puzzle.image} alt='PUZZLE' className='card-img' />
            </div>
            <div className='col-lg-6'>
              <div className='card-body'>
                <h2 className='card-title'>{puzzle.name}</h2>
                <p className='card-text'>Pieces: {puzzle.pieces}</p>
                <p className='card-text'>
                  {puzzle.quantity > 0
                    ? `Stock: ${puzzle.quantity}`
                    : 'Out of Stock'}{' '}
                </p>
                <p className='card-text'>Price: {puzzle.price}€</p>
              </div>
              <div className='card-body py-0'>
                <Link
                  to={'/puzzles/edit/' + puzzle._id}
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
                    item={puzzle}
                    query='puzzles'
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

export default PuzzlePage;
