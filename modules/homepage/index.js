import React, { Component } from 'react';
import { View, Linking, Platform } from 'react-native';
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
    Linking.getInitialURL().then(url => {
      console.log(`from initial url ${url}, call navigate`)
      this.navigate(url);
    });
    Linking.addEventListener('url', this.handleOpenURL);

    const { setLocation } = this.props
    const deviceCoords = await GetDeviceLocation()
    setLocation({ ...deviceCoords, route: "Current Location" })
    this.getToken()
    this.getTheme()

  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
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

  handleOpenURL = (event) => {
    console.log({ handleOpenURL: event })
    this.navigate(event.url);
  }

  navigate = (url) => {
    /**
     * @param { URL }
     * (identifier)://(url)/(merchant code)
     * example: runwayexpress://runwayexpress.co/merchant/1K9RE8AFOSJ34IXVU6TG0LWH27QPNBC5
     * -> navigates to Merchant screen showing merchant with id = 1
     */
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const route_name = route.split('/')[0];
    const payload = route.split('/')[1];
    const payload_value = route.split('/')[2];

    console.log({ route_name, payload, payload_value })

    if (route_name === 'runwayexpress.co') {
      if (payload && payload.toLowerCase() === 'merchant') {
        if (payload_value != null) {
          navigate('Merchant', { merchant_id: payload_value })
        }
      }
      else if (payload && payload.toLowerCase() === 'product') {
        //
      }
      else if (payload && payload.toLowerCase() === 'coupons') {
        //
      }
    } else {
      console.log('shit route name')
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
