import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import Style from './Style.js';
import Pagination from 'components/Pagination';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import Featured from './Featured'
import Categories from './Categories'
import Shops from './Shops'
import { Helper } from 'common';
import GetDeviceLocation from './getDeviceLocation';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  getToken = async () => {
    try {
      const { user } = this.props.state
      const token = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      if(user == null && token != null) {
        const proceedToLogin = NavigationActions.navigate({
          routeName: 'loginStack'
        });
        this.props.navigation.dispatch(proceedToLogin)
      }
    } catch(e) {
      console.log({ tokenError: e })
    }
  }
  
  async componentDidMount() {
    const { setLocation } = this.props
    if(this.props.state.location==null){
    const deviceCoords = await GetDeviceLocation()
    setLocation({ ...deviceCoords, route: "Current Location" })
    }
    this.getToken()
    this.getTheme()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
     async () => {
      if(this.props.state.location==null){
      const deviceCoords = await GetDeviceLocation()
      setLocation({ ...deviceCoords, route: "Current Location" })
        console.log("remount")
      }}
    );
  }

  componentWillUnmount(){
    this.willFocusSubscription.remove()
  }


  getTheme = async () => {
    try {
      const primary = await AsyncStorage.getItem(Helper.APP_NAME + 'primary');
      const secondary = await AsyncStorage.getItem(Helper.APP_NAME + 'secondary');
      const tertiary = await AsyncStorage.getItem(Helper.APP_NAME + 'tertiary');
      console.log('primary', primary)
      if(primary != null && secondary != null && tertiary != null) {
        const { setTheme } = this.props;
        setTheme({
          primary: primary,
          secondary: secondary,
          tertiary: tertiary
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(`${Helper.APP_NAME}primary`, value)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { activeIndex } = this.state;
   
    const onPageChange = (activeIndex) => this.setState({ activeIndex })
    return (
      <View style={Style.MainContainer}>
        <Pagination
          activeIndex={activeIndex}
          onChange={(index) => onPageChange(index)}
        >
        </Pagination>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={Style.sliderContainer}>
              <Featured {...this.props} />
            </View>
            <View style={Style.sliderContainer}>
              <Categories {...this.props} />
            </View>
            <View style={Style.sliderContainer}>
              <Shops {...this.props}/>
            </View>
          </Pager>
        </PagerProvider>
      </View>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setLocation: (location) => dispatch(actions.setLocation(location)),
    setTheme: (theme) => dispatch(actions.setTheme(theme))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
