import baseURL from '../../assets/common/baseURL';
import axios from 'axios';


// add to wishlist
export const addWishList =

  (
    productName,
    productPrice,
    productImage,
    userId,
    productId,

  ) =>

    async dispatch => {


      try {

        dispatch({
          type: 'addWishListRequest',
        });
        const { data } = await axios.post(
          `${baseURL}wishlist/addToWishlist`,
          {
            productName,
            productPrice,
            productImage,
            userId,
            productId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        dispatch({
          type: 'addWishListSuccess',
          payload: data,
        });
      } catch (error) {
        console.log(error)
        dispatch({
          type: 'addWishListFail',
          payload: error.response.data.message,
        });
      }
    };

// get wishlist data
export const getWishList = () => async dispatch => {

  try {
    dispatch({
      type: 'getWishListRequest',
    });
    const { data } = await axios.get(`${baseURL}wishlist/getwishlist`);
    dispatch({
      type: 'getWishListSuccess',
      payload: data.wishlistData,
    });
  } catch (error) {
    console.log(error)

    dispatch({
      type: 'getWishListFail',
      payload: error.response.data.message,
    });
  }
};

// remove from wishlist
export const removeWishList = id => async dispatch => {
  try {
    dispatch({
      type: 'removeWishListRequest',
    });
    const { data } = await axios.delete(`${baseURL}wishlist/removewishlist/${id}`);
    dispatch({
      type: 'removeWishListSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'removeWishListFail',
      payload: error.response.data.message,
    });
  }
};

// add to cart
export const addCart =
  (
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  ) =>
    async dispatch => {
      try {
        dispatch({
          type: 'addCartRequest',
        });
        const { data } = await axios.post(`${baseURL}cart/addToCart`, {
          productName,
          quantity,
          productImage,
          productPrice,
          userId,
          productId,
          Stock,
        });
        dispatch({
          type: 'addCartSuccess',
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: 'addCartFail',
          payload: error.response.data.message,
        });
        console.log(error.response.data.message);
      }
    };

// get cart data
export const getCart = () => async dispatch => {
  try {
    dispatch({
      type: 'getCartRequest',
    });
    const { data } = await axios.get(`${baseURL}cart/getCart`);
    dispatch({
      type: 'getCartSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'getCartFail',
      payload: error.response.data.message,
    });
  }
};

// remove from cart
export const removeCart = id => async dispatch => {
  try {
    dispatch({
      type: 'removeCartRequest',
    });
    const { data } = await axios.delete(`${baseURL}cart/removeCart/${id}`);
    dispatch({
      type: 'removeCartSuccess',
      payload: data,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'removeCartFail',
      payload: error.response.data.message,
    });
  }
};

// update cart
export const updateCart = (id, quantity) => async dispatch => {
  try {
    dispatch({
      type: 'updateCartRequest',
    });
    const { data } = await axios.put(`${baseURL}cart/updateCart/${id}`, {
      quantity,
    });
    dispatch({
      type: 'updateCartSuccess',
      payload: data,
    });
  } catch (error) {
    console.log(error)

    dispatch({
      type: 'updateCartFail',
      payload: error.response.data.message,
    });
  }
};

// create Order
export const createOrder = order => async dispatch => {
  try {
    dispatch({
      type: 'newOrderRequest',
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`${baseURL}order/newOrder`, order, config);
    dispatch({
      type: 'newOrderSuccess',
      payload: data,
    })
    console.log(data);
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'newOrderFail',
      payload: error.response.data.message,
    });
    console.log(error.response.data.message);
  }
};