import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticate } from '../auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#fff' };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/')} to='/'>
            Home
          </Link>
        </li>
        {isAuthenticate() && isAuthenticate().user.role === 0 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticate() && isAuthenticate().user.role === 1 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticate() ? (
          <>
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/signin')}
                to='/signin'
              >
                Signin
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/signup')}
                to='/signup'
              >
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li className='nav-item'>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#fff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
