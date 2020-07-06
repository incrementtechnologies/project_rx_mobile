import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle, faMapMarker, faUniversity, faKaaba } from '@fortawesome/free-solid-svg-icons';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null
    }
  }

  componentDidMount(){
    const { user } = this.props.state;
    if(user != null){
    }
  }


  redirect = (route) => {
    this.props.navigation.navigate(route)
  }

  FlatListItemSeparator = () => {
    return (
      <View style={BasicStyles.Separator}/>
    );
  };


  render() {
    const { isLoading, data } = this.state;
    const { user } = this.props.state;
    return (
      <ScrollView 
        style={Style.ScrollView}
        onScroll={(event) => {
          if(event.nativeEvent.contentOffset.y <= 0) {
          }
        }}
        >
        <View style={[Style.MainContainer, {
          minHeight: height
        }]}>
          {isLoading ? <Spinner mode="overlay"/> : null }
          <View style={Style.MainContainer}>
            <Text>Welcome</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
