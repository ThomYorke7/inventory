import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteForm from './delete-form';

const AccessoryPage = (props) => {
  const [accessory, setAccessory] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/accessories/' + props.match.params.id)
      .then((res) => {
        setAccessory(res.data);
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
              <img
                src={'/' + accessory.image}
                alt='ACCESSORY'
                className='card-img'
              />
            </div>
            <div className='col-lg-6'>
              <div className='card-body'>
                <h2 className='card-title'>{accessory.name}</h2>
                <p className='card-text'>Category: {accessory.category}</p>
                <p className='card-text'>
                  {accessory.quantity > 0
                    ? `Stock: ${accessory.quantity}`
                    : 'Out of Stock'}{' '}
                </p>
                <p className='card-text'>Price: {accessory.price}€</p>
              </div>
              <div className='card-body py-0'>
                <Link
                  to={'/accessories/edit/' + accessory._id}
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
                    item={accessory}
                    query='accessories'
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

export default AccessoryPage;
