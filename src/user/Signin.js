import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../core/Layout';
import { authenticate, signin, isAuthenticate } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'savittree@gmail.com',
    password: '123456',
    error: '',
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, loading, error, redirectToReferer } = values;
  const { user } = isAuthenticate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, error: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            loading: false,
            redirectToReferer: true,
          });
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

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading. . .</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
    if (isAuthenticate()) return <Redirect to='/' />;
  };

  const signUpForm = () => (
    <form>
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
      title='Signin'
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showError()}
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
