import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardgameUpdate = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [duration, setDuration] = useState(0);
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get('http://localhost:5000/boardgames/' + props.match.params.id)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setImage(response.data.image);
        setAuthor(response.data.author);
        setPublisher(response.data.publisher);
        setDuration(response.data.duration);
        setMinPlayers(response.data.minPlayers);
        setMaxPlayers(response.data.maxPlayers);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('description', description);
    data.append('image', image);
    data.append('author', author);
    data.append('publisher', publisher);
    data.append('duration', duration);
    data.append('minPlayers', minPlayers);
    data.append('maxPlayers', maxPlayers);
    data.append('price', price);
    data.append('quantity', quantity);

    axios
      .patch('http://localhost:5000/boardgames/' + props.match.params.id, data)
      .then((res) => console.log(res.data));

    window.location = '/boardgames/list/' + props.match.params.id;
  };

  return (
    <form onSubmit={onSubmit} encType='multipart/form-data'>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-control'
          name='name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          className='form-control'
          name='description'
          rows='3'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          name='image'
          className='form-control-file'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor='author'>Author</label>
        <input
          type='text'
          className='form-control'
          name='author'
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor='publisher'>Publisher</label>
        <input
          type='text'
          className='form-control'
          name='publisher'
          required
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <label htmlFor='duration'>Duration</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='duration'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor='min-players'>Min. Players</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='min-players'
          required
          value={minPlayers}
          onChange={(e) => setMinPlayers(e.target.value)}
        />
        <label htmlFor='max-players'>Max. Players</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='max-players'
          required
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(e.target.value)}
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          min='0'
          className='form-control'
          name='price'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor='quantity'>Quantity</label>
        <input
          type='number'
          min='1'
          className='form-control'
          name='quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Edit
      </button>
    </form>
  );
};

export default BoardgameUpdate;
