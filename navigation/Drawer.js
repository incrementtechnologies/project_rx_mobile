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
import OptionRight from './OptionRight';
class MenuDrawerStructure extends Component {
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
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.state.loginState === true && 
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FontAwesomeIcon icon={ faBars } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle, {
              color: Color.primary
            }]}/>
          </TouchableOpacity>
        }
        
      </View>
    );
  }
}
 
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
  Profile: {
    screen: Profile_StackNavigator,
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
}, {
  contentComponent: Slider
});

export default Drawer;