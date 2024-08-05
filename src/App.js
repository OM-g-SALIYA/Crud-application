import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    age: '',
    location: '',
    gender: ''
  });
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const locations = ['Sutar', 'Ahamdabad', 'Mubai']; // Add more locations as needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedData = data.map((item, index) => (index === editIndex ? formData : item));
      setData(updatedData);
      setEditIndex(-1);
    } else {
      setData([...data, formData]);
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      dob: '',
      age: '',
      location: '',
      gender: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredData = data.filter((item, i) => i !== index);
    setData(filteredData);
  };

  const isAdult = () => {
    const dob = new Date(formData.dob);
    const age = new Date().getFullYear() - dob.getFullYear();
    return age >= 18;
  };

  return (
    <div className="App">
     <div class = "app_form">
      <h2 class="form_head">Crud Application</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name :</label>  
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />          
          <label>Last Name :</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Email :</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Mobile Number :</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <label>Date of Brith :</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {!isAdult() && <p>You must be 18 or older.</p>}
          <label>Location :</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
          <label>Gender :</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                required
              />
              Female
            </label>
          </div>
          <button type="submit" disabled={!isAdult()}>Submit</button>
        </form>
     </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date of Birth</th>
            <th>Location</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.dob}</td>
              <td>{item.location}</td>
              <td>{item.gender}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
