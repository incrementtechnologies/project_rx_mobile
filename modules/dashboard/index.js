import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TextInput,TouchableOpacity} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification,GooglePlacesAutoCompleteWithMap } from 'components';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle, faMapMarker, faUniversity, faKaaba, faFilter } from '@fortawesome/free-solid-svg-icons';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import Geolocation from '@react-native-community/geolocation';
class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null,
      locationChoice:null
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

  filterRedirect=()=>{
    this.redirect('filterPicker')
  }

  currentLocation = () => {
    Geolocation.getCurrentPosition(info => {
     console.log(info.coords.latitude);
    })
  }

  locationOption=(option)=>{
    
    if(option=='currLoc')
    {
      console.log("Hello")
      this.setState({locationChoice:null})
      this.currentLocation()
    }
    else if(option=='addLoc')
    {
      this.setState({locationChoice:null})
      this.redirect('selectLocation')
      
    }
  }

  onLocationOptionChange=(option)=>
  {
    this.setState({locationChoice:option})
    console.log(this.state.locationChoice);
  }

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
            <Text>Welcome2</Text>

          </View>
          <RNPickerSelect
            onValueChange={(value) => this.locationOption(value)}
            items={[
                { label: 'Use Current Location', value: 'currLoc' },
                { label: 'Add Location', value: 'addLoc' },
               
            ]}
        />
          <View style={Style.searchSection}>
    
    <TextInput
        style={Style.input}
        placeholder="User Nickname"
        onChangeText={(searchString) => {this.setState({searchString})}}
       
    />
    <TouchableOpacity onPress={()=>this.filterRedirect()}>
    <FontAwesomeIcon style={Style.searchIcon} icon={faFilter} color={'orange'}/>
    </TouchableOpacity>
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
