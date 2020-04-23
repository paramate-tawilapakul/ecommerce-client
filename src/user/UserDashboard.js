import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticate } from '../auth';

const Dashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticate();

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/cart' className='nav-link'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/profile/update'>
              Profile Update
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Infomation</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 0 ? 'Registered User' : 'Admistrator'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase History</h3>
        <ul className='list-group'>
          <li className='list-group-item'>history</li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      title='Dashboard'
      description={`G'day ${name}!`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
