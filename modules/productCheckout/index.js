import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,Button,StyleSheet, ColorPropType} from 'react-native';

import { Spinner, Empty, SystemNotification,GooglePlacesAutoComplete } from 'components';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Color, Routes } from 'common'
import Api from 'services/api/index.js'

import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import { Divider } from 'react-native-elements';
import _, { isError } from 'lodash'
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
    data:[],
     showStatus:true,
     products,
     totalPrice:0,
     type:'Delivery',
     paymentType:'Cash on Delivery',
    }
  }

  componentDidMount(){
    const { user } = this.props.state;
     if(user != null){
      const parameter = {
        condition : [{
          column: 'account_id',
          clause: '=',
          value: this.props.state.user.id
      }]
    }
      
      Api.request(Routes.cartsRetrieve, parameter, response => {
       this.setState({data:JSON.parse(response.data[0].items)})
      }, error => {
        console.log({ error })
      })
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
    const products=[...this.state.data]
    products[index].quantity+=1
    this.setState({data:products,products})

    const stringifyItems = JSON.stringify(products)
    const parameter = {
      account_id: this.props.state.user.id,
      items: stringifyItems
    }

    this.setState({ isLoading: true })
    Api.request(Routes.cartsCreate, parameter, response => {
      console.log(response.data)
      this.setState({ isLoading: false })
    }, error => {
      console.log({ error })
    })
    
  }

  onSubtract=(index)=>
  {
    const { addProductToCart, removeProductToCart } = this.props
    var products=[...this.state.data]

    if(products[index].quantity>1)
    {
      products[index].quantity-=1 
    }
    else if (products[index].quantity==1)
    {
      removeProductToCart(products[index])
     products.splice(index,1)
     
    }
   console.log(products.length)
    
    this.setState({data:products,products})
    const stringifyItems = JSON.stringify(products)
    const parameter = {
      account_id: this.props.state.user.id,
      items: stringifyItems
    }

    this.setState({ isLoading: true })
    Api.request(Routes.cartsCreate, parameter, response => {
      console.log(response.data)
      this.setState({ isLoading: false })
    }, error => {
      console.log({ error })
    })
  }

  checkCart=()=>
  {
    console.log(this.state.data)
  
  }

  render() {
    const {navigate} = this.props.navigation;
    const first=this.state.data.slice(0,2);
    const rest=this.state.data.slice(2);
    let totalPrices=0
    this.state.data.forEach(product=>{
      totalPrices+=product.quantity*product.price[0].price
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
              onPress={()=>{this.setState({type:"Delivery",paymentType:"Cash on Delivery"})}}
              style={this.state.type=="Delivery" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                  color:this.state.type=="Delivery" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=>{this.setState({type:"Pickup",paymentType:"Cash on Pickup"})}}
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
      this.refs.bottom.onLayout(e);
    }} >
   <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>Subtotal</Text>
      <Text style={{fontSize:15,fontWeight:'bold'}}>{totalPrices}</Text>
      </View>
     {this.state.type=="Delivery" ?  <View style={{ flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>Delivery</Text>
      <Text style={{fontSize:15,fontWeight:'bold'}}>₱50</Text>
     </View>: null}
     <Divider style={{height:3}}/>
     <View style={{ flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>Total</Text>
      <Text style={{fontSize:15,fontWeight:'bold'}}>₱{this.state.type=="Delivery"?totalPrices+50:totalPrices}</Text>
     </View>
     <TearLines
    isUnder
    ref="bottom"
    color="#CCCCCC"
    tearSize={5}
    style={{marginTop:15}}
    backgroundColor="#FFFFFF"/>
      </View>

</View> 

<TouchableOpacity onPress={()=>this.props.navigation.navigate('paymentOptions',{paymentType:this.state.paymentType})}>
<View style={{padding:15,borderWidth:1,borderColor:'#CCCCCC',borderRadius:15,marginRight:50,marginLeft:50}}>
  <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:-10}}>
  <Text>Payment Options</Text>
  <Text style={{color:Color.primary}}>Change</Text>
  </View>
  <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between'}}>
  <Text>{this.state.paymentType}</Text>
  <Text>₱{this.state.type=="Delivery"?totalPrices+50:totalPrices}</Text>
  </View>
</View>
</TouchableOpacity>
     </ScrollView>
     <View style={{justifyContent:'center',width:'100%',flexDirection:'row',backgroundColor:'white',height:90}}>
     <TouchableOpacity
              onPress={() => this.checkCart()} 
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
                
              }}>₱{this.state.type=="Delivery"?totalPrices+50:totalPrices}</Text>
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
    addProductToCart: (product) => dispatch(actions.addProductToCart(product)),
    removeProductToCart: (product) => dispatch(actions.removeProductToCart(product)),
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
