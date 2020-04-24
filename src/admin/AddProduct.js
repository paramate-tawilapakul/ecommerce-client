import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticate } from '../auth';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const { user, token } = isAuthenticate();

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  const init = () => {
    getCategories(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, createdProduct: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, values.formData)
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            category: '',
            shipping: '',
            quantity: '',
            photo: '',
            loading: false,
            createdProduct: data.name,
          });
          document.getElementById('productForm').reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newPostForm = () => {
    return (
      <form className='mb-3' onSubmit={handleSubmit} id='productForm'>
        <h4>Post Photo</h4>
        <div className='form-group'>
          <label className='btn btn-secondary'>
            <input
              type='file'
              name='photo'
              onChange={handleChange}
              accept='image/*'
            />
          </label>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            type='text'
            className='form-control'
            name='name'
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Description</label>
          <textarea
            className='form-control'
            name='description'
            onChange={handleChange}
            value={description}
            required
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Price</label>
          <input
            type='number'
            className='form-control'
            name='price'
            onChange={handleChange}
            value={price}
            required
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Category</label>
          <select
            className='form-control'
            name='category'
            onChange={handleChange}
            value={category}
            required
          >
            <option value=''>Please Select </option>
            {categories &&
              categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Shipping</label>
          <select
            className='form-control'
            name='shipping'
            onChange={handleChange}
            value={shipping}
            required
          >
            <option value=''>Please Select</option>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Quantity</label>
          <input
            type='number'
            className='form-control'
            name='quantity'
            onChange={handleChange}
            value={quantity}
            required
          />
        </div>
        <button className='btn btn-outline-primary'>Create Product</button>
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
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <strong>{createdProduct}</strong> is created
    </div>
  );

  const showLoading = () => (
    <div
      className='alert alert-success'
      style={{ display: loading ? '' : 'none' }}
    >
      Loading...
    </div>
  );

  return (
    <Layout
      title='Add a new Product'
      description={`G'day ${user.name}!, ready to add a new product?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
