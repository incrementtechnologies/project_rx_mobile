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
     data:[],
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
        if(user.account_information.address==null)
        {
          this.validate(response.data[0].id)
        }
        this.setState({data: response.data})
        console.log(response.data)
      }
    },error => {
      console.log(error)
    });
  }
  
  checkData=(index)=>
  {
    console.log(this.state.data[index].id);
  }

  deleteAddress=(index)=>
  {
    const parameter={
      id:this.state.data[index].id
    }
    Api.request(Routes.locationDelete, parameter, response => {
      console.log(response);
    },error => {
      console.log(error)
    });
  }

  goTo=()=>
  {
    this.props.navigation.navigate('addressMap')
  }

  validate = (index) => {
    const { user } = this.props.state;
    if(user === null){
      return
    }
    let parameter = {
      id: user.account_information.account_id,
      account_id: user.id,
      address: index,
    }
    let reloadProfile={
      condition: [{
        value: user.id,
        clause: '=',
        column: 'id'
      }]
    }
    this.setState({isLoading: true})
    Api.request(Routes.accountInformationUpdate, parameter, response => {
      this.setState({isLoading: false})
      if(response.data!=null)
      {
        Api.request(Routes.accountRetrieve, reloadProfile, response => {
          this.setState({isLoading: false})
          const { updateUser } = this.props;
          console.log(response.data)
          this.retrieveLocation(index)
          updateUser(response.data[0])
        });
        
      }
 
    }, (error) => {
      console.log(error)
    });
  }

  retrieveLocation=(index)=>
  {
    const { user } = this.props.state;
    if(user != null){
     const parameter = {
       condition : [{
         column: 'account_id',
         clause: '=',
         value: user.id
     }]
   }
   this.setState({
     isLoading: true
   })
   console.log(this.props.state.user)
   this.setState({isLoading:false})
     Api.request(Routes.locationRetrieve, parameter, response => {
       this.setState({isLoading: false})
       console.log('test',response)
       if(response.data.length > 0){
        //  this.setState({address: response.data.find(def=>{return def.id==parseInt(userInfo.account_information.address)})})
        this.props.setLocation(response.data.find(def=>{return def.id==parseInt(index)}))
        this.setState({isLoading:true})
       }
     },error => {
       console.log(error)
     });
   }
  }

  showAddresses=()=>{
    const addresses=this.state.data;
    const test=[];
    return(
      <View>
         {this.state.data && (addresses.map((address,index)=>(<AddressCard key={address.id} details={address} press={()=>this.checkData(index)} delete={()=>this.validate(address.id)}/>)))}
      </View>
    )
    
        

    
  }

  render() {
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
    <View style={{flex:1}}>
     <ScrollView>
       {this.showAddresses()}
     </ScrollView>
     <View style={{position:'absolute',bottom:35,alignSelf:'flex-end',right:20}}>
       <TouchableOpacity onPress={()=>this.goTo()}>
          <View style={Style.circleButton}>
          <View style={{alignItems:'center'}}>
                   <FontAwesomeIcon size={25}icon={faPlus} color={'white'}/>
          </View>
          </View>
       </TouchableOpacity>
    </View>
     </View>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    updateUser: (user) => dispatch(actions.updateUser(user)),
    setLocation: (location) => dispatch(actions.setLocation(location)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAddresses);
