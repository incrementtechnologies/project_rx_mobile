import Color from './Color.js';
import { faEdit, faComments, faCheck, faPaperPlane, faUser, faMapMarker, faCreditCard, faQuestionCircle, faUsers, faFile } from '@fortawesome/free-solid-svg-icons';
export default {
  company: 'Increment Technologies',
  APP_NAME: '@RunwayExpress_',
  APP_NAME_BASIC: 'RunwayExpress',
  APP_EMAIL: 'support@runwayexpress.com',
  APP_WEBSITE: 'www.runwayexpress.com',
  APP_HOST: 'com.runwayexpress',
  DrawerMenu: [{
    title: 'Homepage',
    route: 'Homepage',
    icon: faUser,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'My Order History',
    route: 'MyOrders',
    icon: faUser,
    iconStyle: {
      color: Color.primary
    }
  }, {
    title: 'My Profile',
    route: 'Profile',
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
  DrawerMenuLogout: [{
    title: 'Homepage',
    route: 'Homepage',
    icon: faUser,
    iconStyle: {
      color: Color.primary
    }
  },
  {
    title: 'My Orders',
    route: 'MyOrders',
    icon: faFile,
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
  pagerMenu: [{
    title: 'FEATURED',
    value: 'featured'
  }, {
    title: 'CATEGORIES',
    value: 'categories'
  }, {
    title: 'SHOPS',
    value: 'shops'
  }, {
    title: 'OTHERS',
    value: 'others'
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
  referral: {
    message:
      `Share the benefits of <<popular products>> with your friends and family. ` +
      `Give them ₱100 towards their first purchase when they confirm your invite. ` +
      `You’ll get ₱100 when they do!`,
    emailMessage: 'I\'d like to invite you on RunwayExpress!'
  },
  categories:[
    {
      type:'Asian',
    },
    {
      type:'American',
    },
    {
      type:'Beverages',
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