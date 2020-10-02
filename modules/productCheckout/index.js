import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,Button,StyleSheet, ColorPropType,TextInput,PermissionsAndroid} from 'react-native';

import { Spinner, Empty, SystemNotification,GooglePlacesAutoComplete } from 'components';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Color, Routes ,BasicStyles} from 'common'
import Api from 'services/api/index.js'
import { NavigationActions } from 'react-navigation'
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
    address:[],
    merchantID:null,
     showStatus:true,
     products,
     totalPrice:0,
     type:'Delivery',
     paymentType:'cod',
     productNumber:0,
 
    }
  }

  
  componentDidMount(){
    const { user } = this.props.state;
    console.log("currentprops",this.props.state)
      this.retrieve()
      console.log("mount")
      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.retrieve()
          console.log("remount")
        }
      );

  }

  componentWillUnmount(){
    this.willFocusSubscription.remove()
  }

    retrieve=()=>
    {
      const { user } = this.props.state;
      if(user != null){
       const parameter = {
         condition : [{
           column: 'account_id',
           clause: '=',
           value: this.props.state.user.id
       }]
     }
     this.setState({
       isLoading: true
     })
     console.log(this.props.state.user)
       Api.request(Routes.cartsRetrieve, parameter, response => {
         console.log("merchant Data",response.data)
        this.setState({data:JSON.parse(response.data[0].items)})
       }, error => {
         console.log({ error })
       })
 
       Api.request(Routes.locationRetrieve, parameter, response => {
         this.setState({isLoading: false})
         console.log('test',response)
         if(response.data.length > 0){
           this.setState({address: response.data.find(def=>{return def.id==parseInt(this.props.state.user.account_information.address)})})

         }
       },error => {
         console.log(error)
       });
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
           <Text numberOfLines={1} style={{fontSize:14,fontWeight:'bold'}}>{this.props.state.location ? this.props.state.location.route :this.state.address.route ? this.state.address.route : "Current Location"}</Text>
           <TouchableOpacity onPress={() => this.goTo()}><FontAwesomeIcon style={{paddingRight:10}} icon={faEdit} color={'orange'}/></TouchableOpacity>
           </View>
           <Text numberOfLines={1} style={{fontSize:14,fontWeight:'bold'}}></Text>
           <Text numberOfLines={1} style={{fontSize:14,fontWeight:'bold'}}></Text>
           <Text numberOfLines={1}></Text>
          </View> 
          
          <MapView
    style={Style.map}
    provider={PROVIDER_GOOGLE}
    initialRegion={{ latitude: parseInt(this.props.state.location.latitude),
      longitude: parseInt(this.props.state.location.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421}}
    >    
     <Marker
      coordinate={{ latitude: parseInt(this.props.state.location.latitude),
        latitudeDelta: 0.0922,
        longitude: parseInt(this.props.state.location.longitude),      
        longitudeDelta: 0.0421}}
    />
    </MapView>

        </View>
      </React.Fragment>
    )
  }
  goTo = () => {
    if (this.props.state.user == null) {
      const proceedToLogin = NavigationActions.navigate({
        routeName: 'loginStack'
      });
      this.props.navigation.dispatch(proceedToLogin)
      return
    }
    this.props.navigation.navigate('ChangeAddress')
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
    this.setState({productNumber:this.state.productNumber+1})
  }

  onSubtract=(index)=>
  {
    const { removeProductToCart } = this.props
    var products=[...this.state.data]
    if(products[index].quantity>1)
    {
      console.log(this.props)
      products[index].quantity-=1
      this.setState({productNumber:this.state.productNumber-1}) 
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
    console.log(JSON.stringify(this.state.data.length))
   
  }

  onCheckOut=(totalPrice)=>
  {
    const paymentType=this.state.paymentType.toLowerCase();


    if(this.state.data.length>0 && this.props.state.user.id!=null){
      if(this.state.amount_tendered!=null && this.state.amount_tendered<totalPrice)
      {
        this.setState({error:1})
      }
      else{
      const parameter= this.state.paymentType=="cod" && this.state.amount_tendered>0 ? {
        account_id:this.props.state.user.id,
        merchant_id:this.state.data[0].merchant_id,
        type:this.state.paymentType,
        payload:"null",
        sub_total:totalPrice,
        tax:0,
        discount:0,
        total:totalPrice,
        payment_status:"pending",
        status:"pending",
        tendered_amount:this.state.amount_tendered,
        change:this.state.amount_tendered!=null ? parseInt(this.state.amount_tendered)-totalPrice : totalPrice,
        currency:"PHP",
        location_id:this.props.state.location?this.props.state.location.id : this.state.address.id,
        shipping_fee:"5",
        latFrom:this.props.state.location.latitude,
        longFrom:this.props.state.location.longitude,
 
      } 
        :
        {
        account_id:this.props.state.user.id,
        merchant_id:this.state.data[0].merchant_id,
        type:this.state.paymentType,
        payload:"null",
        sub_total:totalPrice,
        tax:0,
        discount:0,
        total:totalPrice,
        payment_status:"pending",
        status:"pending",
        currency:"PHP",
        location_id:this.props.state.location?this.props.state.location.id : this.state.address.id,
        shipping_fee:"5",
        latFrom:this.props.state.location.latitude,
        longFrom:this.props.state.location.longitude,
     
      }

      this.setState({ isLoading: true })
      console.log(parameter)
      Api.request(Routes.checkoutCreate,parameter , response => {
        console.log('response',response)
        this.setState({ isLoading: false});
        this.props.navigation.navigate('MyOrders')
      }, error => {
        console.log({ error })
        this.setState({ isLoading: false })
        console.log(this.state.data)
      })
      }
    }
   
  }

  inputErrorCheck=(tenderedAmount,totalPrices)=>
  {
    
    if(tenderedAmount<totalPrices)
    {
      this.setState({amount_tendered:tenderedAmount.replace(/[^0-9]/g, '')})
      this.setState({error:1})
    }
    else{
      this.setState({amount_tendered:tenderedAmount.replace(/[^0-9]/g, '')})
      this.setState({error:0})
    }
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
         {this.state.isLoading ? <Spinner mode="overlay"/> : <ScrollView
      style={Style.ScrollView}
      onScroll={event => {
        if (event.nativeEvent.contentOffset.y <= 0) {
        }
      }}>
        
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:25, marginBottom:15}}>
        <TouchableOpacity
              onPress={()=>{this.setState({type:"Delivery",paymentType:"cod"})}}
              style={this.state.type=="Delivery" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                  color:this.state.type=="Delivery" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=>{this.setState({type:"Pickup",paymentType:"cop",error:0})}}
             style={this.state.type=="Pickup" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                color:this.state.type=="Pickup" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Pickup</Text>
            </TouchableOpacity>
        </View>
        <Divider style={{height:3}}/>
        {
          (this.state.type=="Delivery" && this.props.state.location) ? this.deliveryDetails() : null
        }
        
    
        <View style={Style.TitleContainer}>
        <Text style={{fontSize:15}}>Your Order</Text>
        {this.state.data[0]!=null ? 
        (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Merchant',this.state.data[0])}>
          <Text style={{fontSize:15,color:'#FF5B04'}}>
            Add more Items
          </Text>
        </TouchableOpacity>
        ) :
        (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('drawerStack')}>
          <Text style={{fontSize:15,color:'#FF5B04'}}>
            Add Items to Cart
          </Text>
        </TouchableOpacity>
        )
        }
        
        </View>
        <Divider style={{height:3}}/>
          <View style={{ alignItems: 'center',width:'100%',backgroundColor:'white'}}>
          
             {
                first.map((product,index) => (
                  <CheckoutCard 
                  key={product.id} 
                  details={product} 
                  onSubtract={()=>this.onSubtract(index)} 
                  onAdd={()=>this.onAdd(index)} />
                ))
              }

            {rest.length>0 && this.state.showStatus && (
            <TouchableOpacity 
            onPress={()=>this.renderAll()}>
              <Text style={{marginTop:15,fontSize:15,color:'#FF5B04'}}>
                Show More({rest.length})
              </Text>
            </TouchableOpacity> )}

            {this.state.showStatus ? null : rest.map((product,index)  => (
            <CheckoutCard 
            key={product.id} 
            details={product} 
            onSubtract={()=>this.onSubtract(index+2)} 
            onAdd={()=>this.onAdd(index+2)} />
            ))
            }

            {this.state.showStatus? null : 
            <TouchableOpacity onPress={()=>this.renderAll()}>
              <Text style={{marginTop:15,fontSize:15,color:'#FF5B04'}}>
                Show Less
              </Text>
            </TouchableOpacity>}
         
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
{this.state.error ? <Text style={{height: 25,
    
    alignSelf: 'center',
    justifyContent: 'center',
    color: Color.danger}}>Money on Hand is not enough for the Order!</Text> : null}
           {this.state.paymentType=="cod" && ( <TextInput
              keyboardType={"numeric"}
              style={{padding:10,borderWidth:1,borderColor: this.state.error? Color.danger : '#CCCCCC',borderRadius:15,marginRight:50,marginLeft:50,marginBottom:10}}
              onChangeText={(amount_tendered) => this.inputErrorCheck(amount_tendered,totalPrices)}
              value={this.state.amount_tendered}
              placeholder={'Money on Hand'}
            />)}
<TouchableOpacity onPress={()=>this.props.navigation.navigate('paymentOptions',{paymentType:this.state.paymentType})}>
<View style={{padding:15,borderWidth:1,borderColor:'#CCCCCC',borderRadius:15,marginRight:50,marginLeft:50}}>
  <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:-10}}>
  <Text>Payment Options</Text>
  <Text style={{color:Color.primary}}>Change</Text>
  </View>
  <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between'}}>
  <Text>{this.state.paymentType==="cod"? "Cash on Delivery" : "Cash on Pickup"}</Text>
  <Text>₱{this.state.type=="Delivery"?totalPrices+50:totalPrices}</Text>
  </View>
</View>
</TouchableOpacity>
     </ScrollView>}
     {this.state.isLoading ? null :   
     <View style={{justifyContent:'center',width:'100%',flexDirection:'row',backgroundColor:'white',height:90}}>
     <TouchableOpacity
              onPress={() => this.onCheckOut(totalPrices)} 
              style={{
                position:'absolute',
                justifyContent: 'center',
                height: 50,
                width: '80%',
                borderRadius:10,
                bottom:20,
                backgroundColor: this.state.error ? '#CCCCCC' : '#FF5B04',
                
              }}
              disabled={this.state.error ? true : false}
              >
                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:5}}>
              <View style={Style.circleContainer}><Text style={{alignSelf:'center',color:'#FF5B04'}}>{this.state.data.length + this.state.productNumber}</Text></View>
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
            </View> }
   
      
       
     </View>

    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    removeProductToCart: (products) => dispatch(actions.removeProductToCart(products)),

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
