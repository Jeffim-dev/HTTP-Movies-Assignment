import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = props =>{
  const [item, setItem] =useState({
    title:"",
    director:"",
    metascore:"",
    stars: []
  })

  const changeHandler = e => {
    setItem({
      ...item,
      [e.target.name]:e.target.value
    })
  }
      
  const changeStars = e => {
    setItem({
      ...item,
      stars: e.target.value.split(',')
    })
  } 

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`http://localhost:5000/api/movies/`, item)
    .then(res => {props.history.push("/")})
    .catch(err => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        name="title"
        placeholder='Title'
        value={item.title}
        onChange={changeHandler} 
      />
      <div className="baseline" />

      <input 
        type='text'
        name="director" 
        placeholder='Director'
        value={item.director}
        onChange={changeHandler}
      />
      <div className="baseline" />

      <input 
        type='text'
        name="metascore"
        placeholder='Metascore'
        value={item.metascore}
        onChange={changeHandler}
      />
      <div className="baseline" />
              
      <input 
        type='text'
        name="stars"
        placeholder='Actors'
        value={item.stars}
        onChange={changeStars} 
      />
      <div className="baseline" />

      <button className='form-button'>Submit</button>
    </form>
    )
}

export default AddMovie