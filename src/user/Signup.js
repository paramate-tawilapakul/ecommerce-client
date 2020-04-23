import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, error: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Sign in</Link>
    </div>
  );

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      <button onClick={handleSubmit} className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
  return (
    <Layout
      title='Signup'
      description='Signup to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
