import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,Button,StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Card} from 'react-native-elements';
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
let collectedFilters=[];


class filterPicker extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null,
      checked:false,
      collectedFilterState:[],
 
    }
  }

  stackRedirect=()=>
  {
    this.props.navigation.pop()
    collectedFilters=[]
  }

  redirect = (route) => {
    this.props.navigation.navigate(route)
  }

  componentDidMount(){
    const { user } = this.props.state;
     if(user != null){
    }
  }

  collectFilters=(filter,type)=>
  {
    
    let indexType=collectedFilters.indexOf(type)
    console.log(filter) 
    if(filter)
    {
      if(collectedFilters.indexOf(type)<0)
      {collectedFilters.push(type)}
    }
    else
    {
      collectedFilters.splice(indexType,1)
    }

    console.log(collectedFilters);

    this.setState({collectedFilterState:collectedFilters});
  }

 checkFilters=()=>
 {
   console.log('current filters',this.state.collectedFilterState);
   this.stackRedirect()
 }

  filterCuisine=()=>
  {
    return (
      
    <React.Fragment>
          <Card title='Cuisines'>
     
   
       <View style={styles.checkboxContainer}>
       <Text style={styles.label}>Asian</Text>
      
      <CheckBox
        value={this.state.collectedFilterState.indexOf('asian')>-1 ? true:false}
        onValueChange={value => this.collectFilters(value,'asian')}
      />
        </View>


      <View style={styles.checkboxContainer}>
       <Text style={styles.label}>American</Text>
      
      <CheckBox
        value={this.state.collectedFilterState.indexOf('american')>-1 ? true:false}
        onValueChange={value => this.collectFilters(value,'american')}
      />
        </View> 


        <View style={styles.checkboxContainer}>
       <Text style={styles.label}>Beverages</Text>
      
      <CheckBox
        value={this.state.collectedFilterState.indexOf('beverages')>-1 ? true:false}
        onValueChange={value => this.collectFilters(value,'beverages')}
      />
        </View> 









    </Card>

            </React.Fragment>
    )
    
  }

  render() {
    const { isLoading, data } = this.state;
    const { user } = this.props.state;
    
    return (
      <View style={Style.MainContainer}>
      {this.filterCuisine()}
      <TouchableOpacity
              onPress={()=>this.checkFilters()}
              style={{
            
                justifyContent: 'center',
                height: 50,
               width:'100%',
              
                backgroundColor: Color.white
              }}
              >
              <Text style={{
                color: Color.primary,
                textAlign: 'center'
              }}>Apply Filters</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent:'space-between',
    marginBottom: 30,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(filterPicker);
