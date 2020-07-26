import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,Button,StyleSheet, ColorPropType} from 'react-native';

import { Spinner, Empty, SystemNotification,GooglePlacesAutoComplete } from 'components';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import { Divider } from 'react-native-elements';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Geolocation from '@react-native-community/geolocation';
import { Row } from 'native-base';
import { CheckoutCard } from 'components/Checkout';
import { products } from './data';
import TearLines from "react-native-tear-lines";


class productCheckout extends Component{
  
  constructor(props){
    super(props);
    this.state = {
    
     showStatus:true,
     products,
     totalPrice:0
    }
  }

  componentDidMount(){
    const { user } = this.props.state;
     if(user != null){
    }

  }

  deliveryDetails=()=>{
    return(
      <React.Fragment>
        <View style={Style.DelvToContainer}><Text style={{fontSize:15}}>Deliver To</Text></View>
        <Divider style={{height:3}}/>
        <View style={Style.locationContainer}>
          <View style={{marginLeft:-10,width:'60%'}}>
            <View style={{flexDirection:'row'}}>
           <Text numberOfLines={1} style={{fontSize:14,fontWeight:'bold'}}>Dulce Village, Tabok, Mandaue City</Text>
           <TouchableOpacity onPress={() => this.goTo()}><FontAwesomeIcon style={{paddingRight:10}} icon={faEdit} color={'orange'}/></TouchableOpacity>
           </View>
           <Text numberOfLines={1} style={{fontSize:14,fontWeight:'bold'}}>Block 7 Lot 42</Text>
           <Text numberOfLines={1} style={{fontSize:14,fontWeight:'bold'}}>+63 9143058173</Text>
           <Text numberOfLines={1}>"Description Here"</Text>
          </View> 
          
          <MapView
    style={Style.map}
    provider={PROVIDER_GOOGLE}
    initialRegion={{ latitude: 10.327429298142116,
      longitude: 123.87934366241097,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421}}
    >    
     <Marker
      coordinate={{ latitude: 10.327429298142116,
        longitude: 123.87934366241097,      latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
      title="Hello"
      
    />
    </MapView>

        </View>
      </React.Fragment>
    )
  }
  goTo = () => {
    this.props.navigation.navigate('selectLocation')
  }

  renderAll=()=>
  {    
    if(this.state.showStatus==true)
    {
      this.setState({showStatus:false});
    }
    else
    {
      this.setState({showStatus:true});
    }
  }

  onAdd=(index)=>
  {
    const products=[...this.state.products]
    products[index].quantity+=1
    this.setState({products})
  }

  onSubtract=(index)=>
  {
    const products=[...this.state.products]
    products[index].quantity-=1
    this.setState({products})
  }

  render() {
    const { isLoading, data } = this.state;
    const { user } = this.props.state;
    const first=this.state.products.slice(0,2);
    const rest=this.state.products.slice(2);
    let totalPrices=0
    this.state.products.forEach(product=>{
      totalPrices+=product.quantity*product.price
    })
    return (
      <View style={{height:'100%',backgroundColor:'white'}}>
      <ScrollView
      style={Style.ScrollView}
      onScroll={event => {
        if (event.nativeEvent.contentOffset.y <= 0) {
        }
      }}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:25, marginBottom:15}}>
        <TouchableOpacity
              onPress={()=>{this.setState({type:"Delivery"})}}
              style={this.state.type=="Delivery" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                  color:this.state.type=="Delivery" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=>{this.setState({type:"Pickup"})}}
             style={this.state.type=="Pickup" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                color:this.state.type=="Pickup" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Pickup</Text>
            </TouchableOpacity>
        </View>
        <Divider style={{height:3}}/>
        {this.state.type=="Delivery" ? this.deliveryDetails() : null}
        
    
        <View style={Style.TitleContainer}>
        <Text style={{fontSize:15}}>Your Order</Text>
        <TouchableOpacity><Text style={{fontSize:15,color:'#FF5B04'}}>Add more Items</Text></TouchableOpacity>
        </View>
        <Divider style={{height:3}}/>
          <View style={{ alignItems: 'center',width:'100%',backgroundColor:'white'}}>
          
             {
                first.map((product,index) => (
                  <CheckoutCard key={product.id} details={product} onSubtract={()=>this.onSubtract(index)} onAdd={()=>this.onAdd(index)} />
                ))
              } 
            {this.state.showStatus ? <TouchableOpacity onPress={()=>this.renderAll()}><Text style={{marginTop:15,fontSize:15,color:'#FF5B04'}}>Show More({rest.length})</Text></TouchableOpacity> : rest.map((product,index)  => (<CheckoutCard key={product.id} details={product} onSubtract={()=>this.onSubtract(index+2)} onAdd={()=>this.onAdd(index+2)} />))}
            {this.state.showStatus? null : <TouchableOpacity onPress={()=>this.renderAll()}><Text style={{marginTop:15,fontSize:15,color:'#FF5B04'}}>Show Less</Text></TouchableOpacity>}
         
          </View>
          <View style={{ marginTop:20,backgroundColor: "#FFFFFF" }}>
  <TearLines
    ref="top"
    color="#CCCCCC"
    backgroundColor="#FFFFF"
    tearSize={5}/>
  <View
    style={{ backgroundColor: "#CCCCC",padding:15 }}
    onLayout={e => {
      this.refs.top.onLayout(e);

    }} >
   <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>Subtotal</Text>
      <Text style={{fontSize:15,fontWeight:'bold'}}>{totalPrices}</Text>
      </View>
      <View style={{ flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>Delivery</Text>
      <Text style={{fontSize:15,fontWeight:'bold'}}>₱50</Text>
     </View>
     <Divider style={{height:3}}/>
     <View style={{ flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>Total</Text>
      <Text style={{fontSize:15,fontWeight:'bold'}}>₱1050</Text>
     </View>
      </View>

 
</View> 
     </ScrollView>
     <View style={{justifyContent:'center',width:'100%',flexDirection:'row',backgroundColor:'white',height:90}}>
     <TouchableOpacity
              onPress={() => alert("hello")} 
              style={{
                position:'absolute',
                justifyContent: 'center',
                height: 50,
                width: '80%',
                borderRadius:10,
                bottom:20,
                backgroundColor:'#FF5B04',
              
                
              }}
              >
                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:5}}>
              <View style={Style.circleContainer}><Text style={{alignSelf:'center',color:'#FF5B04'}}>{products.length}</Text></View>
              <Text style={{
                color:'white',
                alignSelf:'center',
                marginLeft:40,
              }}>Place Order</Text>
                  <Text style={{
                color:'white',
                
              }}>{totalPrices}</Text>
             </View>
        </TouchableOpacity>
        </View>
 
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
    marginBottom: 20,
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
)(productCheckout);
