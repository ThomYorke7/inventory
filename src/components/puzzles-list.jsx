import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PuzzleCard from './puzzle-card';
import { IoMdAddCircle } from 'react-icons/io';

const PuzzlesList = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/puzzles')
      .then((res) => {
        setPuzzles(res.data);
        setLoading(false);
      })
      .catch((err) => console.log({ message: err.message }));
  }, []);

  return (
    <div>
      <Link to='/puzzles/add' className='add-link p-2'>
        <IoMdAddCircle className='mr-1'></IoMdAddCircle>
        <span className='d-none d-md-inline'>Add a Puzzle</span>
      </Link>
      {loading && (
        <div className='spinner-border text-warning' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      <div className='card-deck'>
        {puzzles.map((puzzle) => (
          <PuzzleCard
            name={puzzle.name}
            image={puzzle.image}
            price={puzzle.price}
            quantity={puzzle.quantity}
            key={puzzle._id}
            id={puzzle._id}
          ></PuzzleCard>
        ))}
      </div>
    </div>
  );
};

export default PuzzlesList;
