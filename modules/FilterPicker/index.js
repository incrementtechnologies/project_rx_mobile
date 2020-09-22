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
let collectedFilters=[]


class filterPicker extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null,
      checked:false,
      currentFilters:[],
      filters:[],
    }
  }

  stackRedirect=()=>
  {
    this.props.navigation.pop()
    
  }

  redirect = (route) => {
    this.props.navigation.navigate(route)
  }

  componentDidMount(){
    const { user } = this.props.state;
     if(user != null){
    }
    let parameters={}
    this.setState({isLoading:true})
    Api.request(Routes.filters,parameters, response => {
      console.log(response)
        this.setState({currentFilters:response}) 
        this.setState({isLoading:false})
    }, error => {
      console.log('error', error)
    });
    this.setState({ 
      
      filters: [...this.props.state.productFilter]
    })
  }
  


 checkFilters=()=>
 {
  const {productFilter}=this.props.state
   console.log(productFilter)
   
 }

 addFilter=(bool,type)=>
 {
   if(bool)
   {
     this.props.addProductFilter(type);
   }
   else{
     this.props.removeProductFilter(type)
   }
 }

 checkBox=(filter)=>
 {
  
   const {productFilter}=this.props.state
   return(
    <View style={styles.checkboxContainer}>
    <Text style={styles.label}>{filter.category}</Text>
   
   <CheckBox
     value={productFilter.indexOf(filter.category)>-1 ? true:false}
     onValueChange={value=>this.addFilter(value,filter.category)}
   />
     </View> 
   )

 }

  filterCuisine=()=>
  {
    const {productFilter}=this.props.state;
    return (
      
    <React.Fragment>
          <Card title='Cuisines'>
     
          {this.state.isLoading ? <Spinner mode="overlay"/> : null }
       {/* <View style={styles.checkboxContainer}>
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
        </View>  */}

      {this.state.currentFilters.map(products=>(this.checkBox(products)))}
      




{/* Helpers.categories.map */}



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
      {/* <TouchableOpacity
              onPress={()=>this.checkFilters()}
              style={{
            
                justifyContent: 'center',
                height: 50,
               width:'92%',
                marginLeft:15,
                backgroundColor: Color.white
              }}
              >
              <Text style={{
                color: Color.primary,
                textAlign: 'center'
              }}>Apply Filters</Text>
            </TouchableOpacity> */}

<TouchableHighlight
              style={[BasicStyles.btn, {
                backgroundColor: this.props.state.theme ? this.props.state.theme.primary : Color.primary, alignSelf:'center'
              }]}
              onPress={() => this.stackRedirect()}
              underlayColor={Color.gray}>
              <Text style={BasicStyles.textWhite}>
                Apply Filters
              </Text>
            </TouchableHighlight>
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    addProductFilter: (productFilter) => dispatch(actions.addProductFilter(productFilter)),
    removeProductFilter: (productFilter) => dispatch(actions.removeProductFilter(productFilter)),
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
