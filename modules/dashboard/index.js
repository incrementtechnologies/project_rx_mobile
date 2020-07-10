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
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
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
      locationChoice:null,
      location:{
        latitude:null,
        longitude:null,
      }
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
    console.log(info)
     this.setState({location:{
       latitude:info.coords.latitude,
       longitude:info.coords.longitude,
     }})
    })
  }

  



  filterInput=()=>
  {
    return(
      <View style={Style.searchSection}>
    
      <TextInput
          style={Style.input}
          placeholder="Search for Shops"
          onChangeText={(searchString) => {this.setState({searchString})}}
         
      />
      <TouchableOpacity onPress={()=>this.filterRedirect()}>
      <FontAwesomeIcon style={Style.searchIcon} icon={faFilter} color={'orange'}/>
      </TouchableOpacity>
  </View>
    )
  }
  locationChoices=()=>
  {
    return(
      <View style={{width:'100%',paddingBottom:10}}>
      <Collapse>
        <CollapseHeader style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',backgroundColor:'white',height:40}}>
          <View>
            <Text>Choose Location</Text>
          </View>
        </CollapseHeader>
        <CollapseBody style={{alignItems:'center',justifyContent:'center',flexDirection:'column',backgroundColor:'white'}}>
          <TouchableOpacity
         
          style={{borderBottomWidth:1,width:'100%',padding:10}}
          onPress={()=>this.currentLocation()}>
            <Text>Use Current Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{borderBottomWidth:1,width:'100%',padding:10}}
          onPress={()=>this.redirect('selectLocation')}>
            <Text>Set Location</Text>
          </TouchableOpacity>
          
        </CollapseBody>
      </Collapse>
    </View>
    )
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
       
          {isLoading ? <Spinner mode="overlay"/> : null }
        {this.locationChoices()}
       
        {this.filterInput()}
      
      
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
