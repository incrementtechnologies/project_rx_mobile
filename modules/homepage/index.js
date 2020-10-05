import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Style from './Style.js';
import Pagination from 'components/Pagination';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import Featured from './Featured'
import Categories from './Categories'
import Shops from './Shops'
import GetDeviceLocation from './getDeviceLocation';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  
  async componentDidMount() {
    const { setLocation } = this.props

    const deviceCoords = await GetDeviceLocation()
    setLocation({ ...deviceCoords, route: "Current Location" })
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
