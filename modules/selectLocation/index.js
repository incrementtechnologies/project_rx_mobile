import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification,GooglePlacesAutoComplete } from 'components';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import Geolocation from '@react-native-community/geolocation';

class SelectLocation extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null,
      locationChoice:null,
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentDidMount(){
    const { user } = this.props.state;
   
    Geolocation.getCurrentPosition(info => {
      this.setState({region:{
        ...this.state.region,
        latitude:info.coords.latitude,
        longitude:info.coords.longitude
      }});
     }) //Transfer this to if(user!=null) when api available
     if(user != null){
    }
  }

  onRegionChange=(regionUpdate)=> {
    console.log('test',regionUpdate);
    this.setState({ region:regionUpdate });
  }

  manageLocation = (location) => {
    console.log(location)
   
    this.setState({
      location: location
    })
    let r = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  };
  this.mapView.animateToRegion(r, 700);
  }


  onFinish = () => {
    console.log(this.state.locationA)
  }
  
  render() {
    const { isLoading, data } = this.state;
    const { user } = this.props.state;
    return (
  <View style={Style.container}>
      <View style={{
            position: 'absolute',
            backgroundColor: Color.white,
            zIndex: 100,
            width: '100%'
          }}>
            <GooglePlacesAutoComplete 
              onFinish={(location) => this.manageLocation(location)}
              placeholder={'Start typing location'}
              onChange={() => {}}
              zIndex={100}
              initialRegion={this.state.region}
            />
          </View>
    
  
    <MapView
    style={Style.map}
    ref={(ref)=>this.mapView=ref}
    provider={PROVIDER_GOOGLE}
    region={this.state.region}
    onRegionChangeComplete={(e)=>this.onRegionChange(e)}
    //onPress={()=>this.animate()}
    >    


  </MapView>
  
  <View style={Style.imageContainer}>
  <Image
  source={require("../../assets/userPosition.png")}
  style={Style.image} />
  </View>

  <TouchableOpacity
              onPress={() => this.onFinish()} 
              style={{
                justifyContent: 'center',
                height: 50,
                width: '50%',
                bottom:20,
                backgroundColor: Color.white
              }}
              >
              <Text style={{
                color: Color.primary,
                textAlign: 'center'
              }}>Set Location</Text>
            </TouchableOpacity>
</View>  

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
)(SelectLocation);
