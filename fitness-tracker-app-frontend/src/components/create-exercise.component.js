import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const CreateExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  }

  const onChangeDate = (date) => {
    setDate(date);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
  
    console.log(exercise);
  
    axios.post('http://localhost:5001/exercises/add', exercise)
      .then(res => console.log(res.data));
  
    window.location = '/';
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              value={username}
              onChange={onChangeUsername}>
              {
                users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={description}
              onChange={onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration}
              onChange={onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={onChangeDate}
          />
        </div>
  
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
      <div> 
        <center>
            <img src="/gitfitbanner.png" width="800" alt=""></img>
        </center>
      </div>
    </div>
  )
}

export default CreateExercise;
