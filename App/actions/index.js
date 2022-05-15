import axios from 'axios';
import {useDispatch} from 'react-redux';
// const dispatch = useDispatch();
const uri = 'https://fe.dev.dxtr.asia/api';
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWE5MmYzNjEyZWU3ODkzMDliNjU5NTE3YWE2NGM0ZDUyZGQ5MmMyODBmNzA3Nzc5OGYwNzlhMzJhODc4YjcyM2VlY2NhMzg0NDE4ZWVhMTEiLCJpYXQiOjE2NTI0NTY0NTgsIm5iZiI6MTY1MjQ1NjQ1OCwiZXhwIjoxNjgzOTkyNDU4LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.W_ZXpbHXo2P9YVAL_ftJb0IWz9qrmd3XRtfyh7PEJh1byUGhNtxF0kX16nwCeGDCX9Bc5yD1rgSpjIHA5PQZ0L8vbyebp6nYtbC1oa-ioMzmGKJNAfafio3B3x9_UGVLM7sQ2iu2vIw46fSTKvvdxJKV-6aksi4WxrCJVhBu-jebhTdHXgPlsYRwgrBZtQpelAJoUR0gd1LNDxMSFFbcrwLRJi4J3XrxKIhWWsb2PxbDu-3zgZCoNqSV4mBwBfq2HRjp5T7wCRO4yhqlVIx0XpT9EmEGFC5OwVP5SQM58IDsLh_ZZflbFiMd8_QGnDUSJjwljuKaJxq0O4nioNwCF15nhhxZZA011G4WlLgI8Gr8FEr9IEnwd8zR7ZgD8e3zjdvaCaDjdKOVyuXc-bhk2c182s5bDK3Y17Hsxw8U8TW86ANcPJCAr4VkM9_bKiDEY_baklJFCrrbILbnLBUP3Makn03h5btkdF73UpYLDy97P5fsEG9Ig2BAaU4ZGUiJqso87LtL5IIu20b-CUy1rpCRRzW2x7Wm3kb5t10co5VOT6k28ywrUMqDxRNSxNg-xb8ZY6x_hUGIfYzrv59M7lx6uRc1LcfBiOBGu02z8hxQLy5yqjEelpzIht45LXOE3Ig8MT0QTxxuGTsCmYbf6kJ-ObIgj6lxE_8WFYZKLJo';
const getCategories = dispatch => {
  return {
    type: 'GET_CATEGORIES_FETCHING',
    payload: axios
      .get(uri + `/category`, {
        headers: {Authorization: `Bearer `.concat(token)},
      })
      .then(res => {
        dispatch({
          type: 'GET_CATEGORIES_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: 'GET_CATEGORIES_ERROR',
          data: err,
        });
      }),
  };
};

const getProducts = dispatch => {
  return {
    type: 'GET_PRODUCTS_FETCHING',
    payload: axios
      .get(uri + `/products`, {
        headers: {Authorization: `Bearer `.concat(token)},
      })
      .then(res => {
        dispatch({
          type: 'GET_PRODUCTS_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: 'GET_PRODUCTS_ERROR',
          data: err,
        });
      }),
  };
};

module.exports = {
  getCategories,
  getProducts,
};
