import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Slider from 'components/Slider/WithIcons.js';
import { Color, BasicStyles } from 'common';
import Homepage from 'modules/homepage';
import Dashboard from 'modules/dashboard';
import Notification from 'modules/notification';
import Profile from 'modules/profile';
import HelpCenter from 'modules/helpCenter';
import OptionRight from './OptionRight';
import TermsAndConditions from 'modules/terms';
import PrivacyPolicy from 'modules/privacy';
import Merchant from 'modules/merchant';
import MyAddress from 'modules/myAddresses';
import Settings from 'modules/settings';
import Referral from 'modules/referral';
import MyOrders from 'modules/orders';
import { connect } from 'react-redux';

class MenuDrawerContentStructure extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginState: true
    };
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    const { theme } = this.props.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.state.loginState === true && 
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FontAwesomeIcon icon={ faBars } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle, {
              color: theme ? theme.primary : Color.primary
            }]}/>
          </TouchableOpacity>
        }
        
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setActiveRoute: (route) => dispatch(actions.setActiveRoute(route))
  };
};

let MenuDrawerStructure = connect(mapStateToProps, mapDispatchToProps)(MenuDrawerContentStructure);
 
const Homepage_StackNavigator = createStackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
  Merchant: {
    screen: Merchant,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: '#fff'
    }
  }
});

 
const Dashboard_StackNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const HelpCenter_StackNavigator = createStackNavigator({
  HelpCenter: {
    screen: HelpCenter,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const Privacy_StackNavigator = createStackNavigator({
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});
const Terms_StackNavigator = createStackNavigator({
  TermsAndConditions: {
    screen: TermsAndConditions,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const Notification_StackNavigator = createStackNavigator({
  Notification: {
    screen: Notification,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const MyOrders_StackNavigator = createStackNavigator({
  MyOrders: {
    screen: MyOrders,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const Profile_StackNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const MyAddress_StackNavigator = createStackNavigator({
  MyAddress: {
    screen: MyAddress,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const Settings_StackNavigator = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});

const Referral_StackNavigator = createStackNavigator({
  InviteFriends: {
    screen: Referral,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#fff',
    }),
  },
});


const Drawer = createDrawerNavigator({
  Homepage: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Dashboard: {
    screen: Dashboard_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  HelpCenter: {
    screen: HelpCenter_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  MyOrders: {
    screen: MyOrders_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Profile: {
    screen: Profile_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  MyAddress: {
    screen: MyAddress_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  TermsAndConditions: {
    screen: Terms_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  PrivacyPolicy: {
    screen: Privacy_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Notification: {
    screen: Notification_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Settings: {
    screen: Settings_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  InviteFriends: {
    screen: Referral_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    }
  }
}, {
  contentComponent: Slider
});

export default Drawer;