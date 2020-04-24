import { API } from '../config';

export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (token) => {
  try {
    const response = await fetch(`${API}/categories`, {
      method: 'GET',
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
