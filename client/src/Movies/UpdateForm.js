import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = props =>{ 
  const [item, setItem] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  })

  const { id } = useParams();

  useEffect(() => {
    //   const itemToUpdate = props.items.find(item => `${item.id}` === id);

    //   if (itemToUpdate) {
    //     setItem(itemToUpdate);
    //   }
    // }, [props.items, id]);
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {setItem(res.data)})
    .catch(err => console.log(err))
  }, [id])

  const changeHandler = e => {
    setItem({
      ...item,
      [e.target.name]:e.target.value
    })
  }

  const changeStars = e => {
    setItem({
      ...item,
      [e.target.name]:e.target.value.split(',')
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        props.history.push(`/movies/${id}`);
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h2 className='form-title'>{item.title}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name="title" 
          value={item.title}
          onChange={changeHandler}
        />
        <div className="baseline" />

        <input 
          type='text'
          name="director"
          value={item.director}
          onChange={changeHandler} 
        />
        <div className="baseline" />

        <input 
          type='text'
          name="metascore"
          value={item.metascore}
          onChange={changeHandler} 
        />
        <div className="baseline" />

        <input 
          type='text'
          name="stars"
          value={item.stars}
          onChange={changeStars} 
        />
        <div className="baseline" />

        <button className='form-button'>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;