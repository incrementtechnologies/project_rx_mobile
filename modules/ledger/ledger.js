import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ColorPropType,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import {  Color } from 'common';
import Style from './Style.js';
import { Spinner } from 'components';
import { Routes } from 'common';
import Api from 'services/api/index.js'

import {Ledger} from 'components/Ledger'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import { promo, UserLocation } from './data-test';
import {ledgerData} from './ledger-data-test';

class Ledger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      data: null,
      searchString:'',
      featured: []
    };
  }

  componentDidMount() {

  }



  render() {
  

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={100}
        >
          {ledgerData.map((details)=>(
            <Ledger details={details} key={details.id}/>
          ))}
        </ScrollView>
      </SafeAreaView>
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
)(Ledger);
