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
import AddressCard from 'modules/checkoutChangeAddress/addressCard.js'
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import {dataAddress} from './data'


class ChangeAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
     showInput:false,
     data:[],
     value:0,
     returnedAddress:{},
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
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
  retrieve = () => {
    const { user } = this.props.state;
  
    const parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '=',
      }]
    }
    this.setState({
      isLoading: true
    })
    Api.request(Routes.locationRetrieve, parameter, response => {
      this.setState({isLoading: false})
      console.log('test',response)
      if(response.data.length > 0){
        this.setState({data: response.data})
        console.log(response.data)
      }else{
      
        this.setState({data: null})
      }
    },error => {
      console.log(error)
    });
  }
  

  goTo=()=>
  {
    this.props.navigation.navigate('addressMap')
  }

  changeAddress=(index)=>
  {
    this.setState({value:index,returnedAddress:this.state.data[index]})
  }
  showAddresses=()=>{
    const addresses=this.state.data
    return(
      <View style={{flex:1}}>
      {addresses.map((address,index)=>(<AddressCard index={index} current={this.state.value} key={address.id} details={address} pickAddress={()=>this.changeAddress(index)} />))}
      <View style={{flex:1,flexDirection:'row-reverse',padding:25}}>
        <View style={{flexDirection:'column-reverse'}}>
       <TouchableOpacity onPress={()=>this.goTo()}>
          <View style={Style.circleButton}>
          <View style={{alignItems:'center'}}>
                   <FontAwesomeIcon size={25}icon={faPlus} color={'white'}/>
              
          </View>
          </View>
       </TouchableOpacity>
        </View>
        </View>
        </View>
    )
    
        

    
  }

  render() {
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
     <View style={{flex:1}}>
       {this.showAddresses()}
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
)(ChangeAddress);
