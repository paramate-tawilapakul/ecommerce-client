import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticate } from '../auth';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const handleChange = (e) => {
    setError('');
    setSuccess(false);
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            type='text'
            className='form-control'
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
        </div>
        <button className='btn btn-outline-primary'>Create Category</button>
      </form>
    );
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>
        Back to Dashboard
      </Link>
    </div>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      Category <strong>{name}</strong> already exists
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      <strong>{name}</strong> is created
    </div>
  );

  return (
    <Layout
      title='Add a new Category'
      description={`G'day ${user.name}!, ready to add a new category?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
