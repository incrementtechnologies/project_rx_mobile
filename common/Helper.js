import Color from './Color.js';
import { faEdit, faComments, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
export default {
  company: 'Increment Technologies',
  APP_NAME: '@RunwayExpress_',
  APP_NAME_BASIC: 'RunwayExpress',
  APP_EMAIL: 'support@runwayexpress.com',
  APP_WEBSITE: 'www.runwayexpress.com',
  APP_HOST: 'com.runwayexpress',
  DrawerMenu: [{
    title: 'Dashboard',
    route: 'Dashboard'
  }, {
    title: 'My Profile',
    route: 'Profile'
  }
  ],
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
      text: 'Let\'s be one in Fighting COVID-19!',
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