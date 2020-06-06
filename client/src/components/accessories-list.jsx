import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccessoryCard from './accessory-card';
import { IoMdAddCircle } from 'react-icons/io';

const AccessoriesList = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('api/accessories')
      .then((res) => {
        setAccessories(res.data);
        setLoading(false);
      })
      .catch((err) => console.log({ message: err.message }));
  }, []);

  return (
    <div>
      <Link to='/accessories/add' className='add-link px-2 py-3'>
        <IoMdAddCircle className='mr-1'></IoMdAddCircle>
        <span className='d-none d-md-inline'>Add an Accessory</span>
      </Link>
      {loading && (
        <div className='text-center'>
          <div className='spinner-border text-warning m-5' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
      <div className='card-deck'>
        {accessories.map((accessory) => (
          <AccessoryCard
            name={accessory.name}
            image={accessory.image}
            price={accessory.price}
            quantity={accessory.quantity}
            key={accessory._id}
            id={accessory._id}
          ></AccessoryCard>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesList;
