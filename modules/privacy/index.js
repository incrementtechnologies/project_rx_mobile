import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import Geolocation from '@react-native-community/geolocation';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);



class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
  }


  render() {
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
     <View><Text>Hello</Text></View>
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
)(Privacy);
