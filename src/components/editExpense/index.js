import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditExpenses = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', amount: '' });
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://newback-vc3e.onrender.com/edit-expense/${id}`, formData);
      navigate('/expenses')
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const fetchData = async () => {
    try {
      const dbResponse = await axios.get(`https://newback-vc3e.onrender.com/fetch-by-id/${id}`);
      setFormData(dbResponse.data);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Edit Your Expenses</h1>
      <form onSubmit={submitHandler}>
        <label>Title</label><br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange} /><br />
        <label>Amount</label><br />
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange} /><br />
        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default EditExpenses;
