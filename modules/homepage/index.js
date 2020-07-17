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
    return (
      <View style={Style.MainContainer}>
        <Pagination
        activeIndex={activeIndex}
        onChange={(index) => this.setState({
          activeIndex: index
        })}
        ></Pagination>
        <PagerProvider activeIndex={activeIndex}>
          <Pager>
            <View style={Style.sliderContainer}>
              <Text>Featured</Text>
            </View>
            <View style={Style.sliderContainer}>
              <Text>Categories</Text>
            </View>
            <View style={Style.sliderContainer}>
              <Text>Shops</Text>
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
