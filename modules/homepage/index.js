import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import Api from 'services/api/index.js';
import Pagination from 'components/Pagination';
import Currency from 'services/Currency.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <View style={Style.MainContainer}>
        <Pagination></Pagination>
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
