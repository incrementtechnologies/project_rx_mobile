import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import Api from 'services/api/index.js';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification ,GooglePlacesAutoComplete} from 'components';
import Geolocation from '@react-native-community/geolocation';
import AddressCard from 'modules/myAddresses/addressCard.js'
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import cardValidator from 'card-validator'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CreditCardInput } from "react-native-credit-card-input";
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

var radio_choices=[
  {label:'Credit Card/Debit Card', value:"credit card/debit card"},
]

class MyAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
     showInput:false,
     value: this.props.navigation.state.params.paymentType,
     ccType:null,
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    const {paymentType}=this.props.navigation.state.params
    console.log(paymentType)
    this.setState({paymentType:paymentType})
   
  }

  checkCard=()=>{
    const testCard = cardValidator.number("4111")

    if(testCard.card)
    {
      console.log(this.state.paymentType);
    }
  }

  _onChange = (form) => {this.setState({ccType:form.values.type})};

  ccInputs=()=>
  {
    return(
      <View style={Style.container}>
      <CreditCardInput
      autoFocus

      requiresName
      requiresCVC
      labelStyle={Style.label}
      inputStyle={Style.input}
      validColor={"black"}
      invalidColor={"red"}
      placeholderColor={"darkgray"}
       onChange={this._onChange} />
      </View>
    )
  }

  ccImages=()=>
  {

   return (
    <React.Fragment>
    <Image
    source={require("../../assets/visa.png")}
    style={{height:40,width:40, opacity:this.state.ccType=="visa" ? 1.0 : this.state.ccType==null ? 1.0 : 0.2}} /> 
    <Image
    source={require("../../assets/mastercard.png")}
    style={{height:40,width:40, opacity:this.state.ccType=="master-card" ? 1.0 : this.state.ccType==null ? 1.0 : 0.2 }} />
    <Image
    source={require("../../assets/amex.png")}
    style={{height:40,width:40, opacity:this.state.ccType=="amex" ? 1.0 : this.state.ccType==null ? 1.0 : 0.2}} />
    <Image
    source={require("../../assets/jcb.png")}
    style={{height:40,width:40, opacity:this.state.ccType=="jcb" ? 1.0 : this.state.ccType==null ? 1.0 : 0.2}} />
    <Image
    source={require("../../assets/unionpay.png")}
    style={{height:40,width:40, opacity:this.state.ccType=="unionpay" ? 1.0 : this.state.ccType==null ? 1.0 : 0.2}} />
    </React.Fragment>
   
    )
  }

  render() {
 
    return (
     <View style={{flex:1}}>
   
   <View  style={Style.buttonContainer}>
   <TouchableOpacity style={Style.circle} onPress={()=>this.setState({value:this.state.paymentType})}>
   {this.state.value===this.state.paymentType && (<View style={Style.checkedCircle} />)}
    </TouchableOpacity>
    <Text style={{marginLeft:15}}>{this.state.paymentType}</Text>
    </View>

  <View  style={Style.buttonContainer}>
   <TouchableOpacity style={Style.circle} onPress={()=>this.setState({value:'credit card/debit card'})}>
            {this.state.value==="credit card/debit card" && (<View style={Style.checkedCircle} />)}
    </TouchableOpacity>
    <View style={{width:'35%'}}>
    <Text style={{marginLeft:15}}>Credit Card/Debit Card</Text>
    </View>
    {this.ccImages()}
    
    </View>
    {this.state.value==="credit card/debit card" ? this.ccInputs() : null}
     </View>
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
)(MyAddresses);
