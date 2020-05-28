import React from 'react';
import { Link } from 'react-router-dom';

const AccessoriesList = () => {
  return (
    <div>
      <p>You are in the Accessories List</p>
      <Link to='/accessories/add'>Add an Accessory</Link>
    </div>
  );
};

export default AccessoriesList;
