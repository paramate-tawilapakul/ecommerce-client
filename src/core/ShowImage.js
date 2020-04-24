import React from 'react';
import { API } from '../config';

const ShowImage = ({ _id, name }) => {
  return (
    <div className='product-img'>
      <img
        src={`${API}/products/photo/${_id}`}
        alt={name}
        className='mb-3'
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
};

export default ShowImage;
