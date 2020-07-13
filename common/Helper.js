import Color from './Color.js';
import { faEdit, faComments, faCheck, faPaperPlane, faUser, faMapMarker, faCreditCard, faQuestionCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
export default {
  company: 'Increment Technologies',
  APP_NAME: '@RunwayExpress_',
  APP_NAME_BASIC: 'RunwayExpress',
  APP_EMAIL: 'support@runwayexpress.com',
  APP_WEBSITE: 'www.runwayexpress.com',
  APP_HOST: 'com.runwayexpress',
  DrawerMenu: [{
    title: 'Dashboard',
    route: 'Dashboard',
    icon: faUser,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'My Profile',
    route: 'MyProfile',
    icon: faUser,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'My Address',
    route: 'MyAddress',
    icon: faMapMarker,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'Payment Methods',
    route: 'PaymentMethods',
    icon: faCreditCard,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'Help Center',
    route: 'HelpCenter',
    icon: faQuestionCircle,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'Invite Friends',
    route: 'InviteFriends',
    icon: faUsers,
    iconStyle: {
      color: Color.primary
    }
  }],
  DrawerMenuBottom: [{
    title: 'Settings',
    route: 'Settings'
  }, {
    title: 'Terms and Conditions',
    route: 'TermsAndConditions'
  }, {
    title: 'Privacy Policy',
    route: 'PrivacyPolicy'
  }],
  pusher: {
    broadcast_type: 'pusher',
    channel: 'runwayexpress',
    notifications: 'App\\Events\\Notifications',
    typing: 'typing'
  },
  tutorials: [
    {
      key: 1,
      title: 'Welcome to RunwayExpress!',
      text: 'Delivering food and more to your doorstep!',
      icon: null,
      image: require('assets/logo.png'),
      colors: [Color.primary, Color.lightGray]
    }
  ],
  retrieveDataFlag: 1,
  validateEmail(email){
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/
    if(reg.test(email) === false){
      return false
    }else{
      return true
    }
  }
}