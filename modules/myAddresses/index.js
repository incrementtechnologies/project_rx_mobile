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
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import {dataAddress} from './data'


class MyAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
     showInput:false,
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
      this.retrieve()
  }

  retrieve = () => {
    const { user } = this.props.state;
  
    const parameter = {
      condition: [{
        value: 1,
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

  showAddresses=()=>{
    return(
      <View style={{flex:1}}>
      {dataAddress.map(address=>(<AddressCard key={address.id} details={address}/>))}
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
)(MyAddresses);
