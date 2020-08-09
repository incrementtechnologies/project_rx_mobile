import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/';
export default {
  auth: apiUrl + 'authenticate',
  authUser: apiUrl + 'authenticate/user',
  authRefresh: apiUrl + 'authenticate/refresh',
  authInvalidate: apiUrl + 'authenticate/invalidate',
  accountRetrieve: apiUrl + 'accounts/retrieve',
  accountUpdate: apiUrl + 'accounts/update',
  accountCreate: apiUrl + 'accounts/create',
  notificationsRetrieve: apiUrl + 'notifications/retrieve',
  notificationUpdate: apiUrl + 'notifications/update',
  accountProfileCreate: apiUrl + 'account_profiles/create',
  accountProfileUpdate: apiUrl + 'account_profiles/update',
  accountInformationRetrieve: apiUrl + 'account_informations/retrieve',
  accountInformationUpdate: apiUrl + 'account_informations/update',
  emailAlert: apiUrl + 'emails/alert',
  locationCreate:apiUrl + 'locations/create',
  locationRetrieve:apiUrl + 'locations/retrieve',
  // referral
  invitationCreate: apiUrl + 'invitations/create',
  invitationRetrieve: apiUrl + 'invitations/retrieve',
  // images
  imageUpload: apiUrl + 'images/upload',
  imageRetrieve: apiUrl + 'images/retrieve',
  // carts
  cartsCreate: apiUrl + 'carts/create',
  cartsRetrieve: apiUrl + 'carts/retrieve',
  cartsDelete: apiUrl + 'carts/delete',
  cartsUpdate: apiUrl + 'carts/update',
  // products
  productsRetrieve: apiUrl + 'products/retrieve_basic',
  // dashboard
  dashboardRetrieveCategoryList: apiUrl + 'dashboard/categories',
  dashboardRetrieveFeaturedProducts: apiUrl + 'dashboard/featured',
  dashboardRetrieveCategoryProducts: apiUrl + 'dashboard/category',
  dashboardRetrieveShops: apiUrl + 'dashboard/shops',
  // checkout
  checkoutCreate: apiUrl + 'checkouts/create',
  checkoutRetrieve: apiUrl + 'checkouts/retrieve'
}