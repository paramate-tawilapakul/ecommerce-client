import React from 'react';
import Menu from './Menu';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => {
  return (
    <>
      <Menu />
      <div className='jumbotron'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </>
  );
};

export default Layout;
