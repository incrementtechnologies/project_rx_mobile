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
import MyAddress from 'modules/checkoutChangeAddress';
import Settings from 'modules/settings';
import Referral from 'modules/referral';
import MyOrders from 'modules/orders';
import MyOrderDetails from 'modules/orders/MyOrderDetails';
import MessengerMessages from 'components/Messenger/MessagesV2';
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
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#000',
      headerTitle: 'Merchant'
    }
  },
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
  Notification: {
    screen: Notification,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: '#000',
      headerTitle: 'Notifications'
    }
  },
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
  MyOrderDetails: {
    screen: MyOrderDetails,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: Color.primary,
      headerBackTitleStyle: {
        color: '#fff',
      },
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
    }),
  },
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
  PaymentMethods: {
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
  MessengerMessages: {
    screen: MessengerMessages,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('messengerHeaderTitle'),
      headerTintColor: Color.primary,
      headerBackTitleStyle: {
        color: '#fff',
      },
      headerStyle: {
        backgroundColor: Color.white,
        color: Color.black
      },
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
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  HelpCenter: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  MyOrders: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Profile: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  MyAddress: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  TermsAndConditions: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  PrivacyPolicy: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Notification: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  Settings: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    },
  },
  InviteFriends: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    }
  },
  PaymentMethods: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    }
  },
  MessengerMessages: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    }
  },
  MyOrderDetails: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: '',
    }
  }
}, {
  contentComponent: Slider
});

export default Drawer;