import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import Api from 'services/api/index.js';
import Pagination from 'components/Pagination';
import Currency from 'services/Currency.js';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import Featured from './Featured'
import Categories from './Categories'
import Shops from './Shops'

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  componentDidMount() {
  }


  render() {
    const { activeIndex } = this.state;
    console.log({ propsState: this.props.state })
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
            <View style={Style.sliderContainer}>
              <Text>Others</Text>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
