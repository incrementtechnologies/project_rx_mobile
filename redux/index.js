import AsyncStorage from '@react-native-community/async-storage';
import Data from 'services/Data';
import { Helper } from 'common';

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  UPDATE_USER: 'UPDATE_USER',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
  ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
  UPDATE_PRODUCT_TO_CART: 'UPDATE_PRODUCT_TO_CART',
  REMOVE_PRODUCT_TO_CART: 'REMOVE_PRODUCT_TO_CART',
  RETRIEVE_CART: 'RETRIEVE_CART',
  SET_THEME: 'SET_THEME',
  ADD_PRODUCT_FILTER: 'ADD_PRODUCT_FILTER',
  REMOVE_PRODUCT_FILTER: 'REMOVE_PRODUCT_FILTER',
  nav: null,
}

export const actions = {
  login: (user, token) => {
    return { type: types.LOGIN, user, token };
  },
  logout() {
    return { type: types.LOGOUT };
  },
  updateUser: (user) => {
    return { type: types.UPDATE_USER, user };
  },
  setNotifications(unread, notifications){
    return { type: types.SET_NOTIFICATIONS, unread, notifications };
  }, 
  updateNotifications(unread, notification){
    return { type: types.UPDATE_NOTIFICATIONS, unread, notification };
  }, 
  addProductToCart(product){
    return { type: types.ADD_PRODUCT_TO_CART, product };
  },
  updateProductToCart(product){
    return { type: types.UPDATE_PRODUCT_TO_CART, product };
  },
  retrieveCart: (cartItems) => {
    return { type: types.RETRIEVE_CART, cartItems };
  },
  removeProductToCart(product){
    return { type: types.REMOVE_PRODUCT_TO_CART, product };
  },
  setTheme(theme){
    return { type: types.SET_THEME, theme };
  },
  addProductFilter(productFilter){
    return { type: types.ADD_PRODUCT_FILTER, productFilter };
  },
  removeProductFilter(productFilter){
    return { type: types.ADD_PRODUCT_FILTER, productFilter };
  }
};

const initialState = {
  token: null,
  user: null,
  notifications: null,
  cart: [],
  theme: null,
  productFilter: []
}

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${Helper.APP_NAME}${key}`, value)
  } catch (e) {
    // saving error
  }
}

const reducer = (state = initialState, action) => {
  const { type, user, token } = action;
  const { unread } = action;
  const { notification } = action;
  const { product } = action;
  const { theme } = action;
  const { productFilter } = action;
  const { cartItems } = action;

  switch (type) {
    case types.LOGOUT:
      AsyncStorage.clear();
      return Object.assign({}, initialState);
    case types.LOGIN:
      storeData('token', token);
      console.log('LOGIN', true);
      Data.setToken(token)
      return { ...state, user, token };
    case types.UPDATE_USER:
      return {
        ...state,
        user
      }
    case types.SET_NOTIFICATIONS:
      let notifications = {
        unread,
        notifications: action.notifications
      }
      console.log('notifications', true);
      return {
        ...state,
        notifications
      }
    case types.UPDATE_NOTIFICATIONS:
      let updatedNotifications = null
      if(state.notifications == null){
        let temp = []
        temp.push(notification)
        updatedNotifications = {
          unread,
          notifications: temp
        }
      }else{
        let oldNotif = state.notifications
        if(oldNotif.notifications == null){
          let temp = []
          temp.push(notification)
          updatedNotifications = {
            unread,
            notifications: temp
          }
        }else{
          if(parseInt(notification.id) != parseInt(oldNotif.notifications[oldNotif.notifications.length - 1].id)){
            oldNotif.notifications.unshift(notification)
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications
            }
          }else{
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications
            }
          }
        }
      }
      return {
        ...state,
        notifications: updatedNotifications
      }
    case types.ADD_PRODUCT_TO_CART:
      let cartProduct = state.cart
      let flag = false
      for (var i = 0; i < state.cart.length; i++) {
        let item = state.cart[i]
        if(parseInt(product.id) == parseInt(item.id)){
          flag = true
          break
        }
      }
      if(flag == false){
        cartProduct.push(product)
      }
      return {
        ...state,
        cart: cartProduct
      }
    case types.RETRIEVE_CART:
      return {
        ...state,
        cart: cartItems
      }
    case types.UPDATE_PRODUCT_TO_CART:
      let updateCart = state.cart.map(item => {
        if(parseInt(product.id) == parseInt(item.id)){
          return product
        }else{
          return item
        }
      })
      return {
        ...state,
        cart: updateCart
      }
    case types.REMOVE_PRODUCT_TO_CART:
      let removeCart = state.cart.filter(item => {
        return parseInt(product.id) != parseInt(item.id)
      })
      return {
        ...state,
        cart: removeCart
      }
    case types.SET_THEME:
      storeData('primary', theme.primary);
      storeData('secondary', theme.secondary);
      storeData('tertiary', theme.tertiary);
      return{
        ...state,
        theme
      }
    case types.ADD_PRODUCT_FILTER:
      let productFilterTemp = state.productFilter
      let flagFilter = false
      for (var i = 0; i < state.productFilter.length; i++) {
        let item = state.productFilter[i]
        if(productFilter == item){
          flagFilter = true
          break
        }
      }
      if(flagFilter == false){
        productFilterTemp.push(productFilter)
      }
      return {
        ...state,
        productFilter: productFilterTemp
      }
    case types.REMOVE_PRODUCT_FILTER:
      let removeProductFilter = state.productFilter.filter(item => {
        return productFilter != item
      })
      return {
        ...state,
        productFilter: removeProductFilter
      }
    default:
      return {...state, nav: state.nav};
  }
}
export default reducer;