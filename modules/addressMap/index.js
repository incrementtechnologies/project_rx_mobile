import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,StatusBar,TextInput} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification,GooglePlacesAutoComplete } from 'components';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import {faChevronRight,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import Geolocation from '@react-native-community/geolocation';
import Drawer from 'react-native-draggable-view'
import iconClaw from "../../assets/icon_claw.png"
import { Colors } from 'react-native/Libraries/NewAppScreen';
class SelectLocation extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null,
      address:null,
      locationChoice:null,
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      isDraggingMap:false,
      locationPicked:false,
      pinnedLocation:false,
      type:null,
    }
  }

  componentDidMount(){
    const { user } = this.props.state;
   
    Geolocation.getCurrentPosition(info => {
      console.log(info)
      this.setState({region:{
        ...this.state.region,
        latitude:info.coords.latitude,
        longitude:info.coords.longitude
      }});
     }) //Transfer this to if(user!=null) when api available
     if(user != null){
    }
  }


  setMapDragging = () => {
    if (!this.state.isDraggingMap) {
      this.setState({
        isDraggingMap: true,
      });
    }
  };

  returnToOriginal=()=>
  {
    Geolocation.getCurrentPosition(info => {
      console.log(info)
      this.setState({region:{
        ...this.state.region,
        latitude:info.coords.latitude,
        longitude:info.coords.longitude
      },pinnedLocation:false,address:null});
     })
  }

  onRegionChange=(regionUpdate)=> {
    if (this.state.isDraggingMap) {
      this.setState({
        isDraggingMap: false,
      });
    }

    if (!this.state.isDraggingMap) {
      return;
    }
    console.log("test",regionUpdate)
    this.setState({ region:regionUpdate, address:'Pinned Location',pinnedLocation:true });
  }

  manageLocation = (location) => {
    console.log(location)
   
    this.setState({
      region: {
        ...this.state.region,
        latitude:location.latitude,
        longitude:location.longitude,
      },
      address:location.route,
    })
 
  }

  onFormSubmit=()=>
  {
    const {user}=this.props.state
    if(user === null){
      return
    }
    let parameter = [{
      account_id: 4,
      address_type:"Home",
      latitude:"10.325098279684404",
      longitude:"123.88028847053647",
      route:"Yaps Residence Gabutan Compound",
      locality:"Cebu City",
      region:"7",
      country:"Philippines",
    }]

    let parameter2=JSON.stringify(parameter)
    console.log(parameter)

    Api.request(Routes.locationCreate, parameter, response => {
      console.log(response)
    }, error => {
      console.log(error)
    });

    
  }
  onFinish = () => {
    console.log(this.state.region)
    if(this.state.address==null)
    {
      alert("Please Input an Address or Use the Pin")
    }
    else
    this.setState({locationPicked:true})
  }

  renderMap=()=>
  {
    return(
      <View style={Style.container}>
         <View style={{
            position: 'absolute',
            backgroundColor: Color.white,
            zIndex: 100,
            width: '100%'
          }}>
            <GooglePlacesAutoComplete 
              onFinish={(location) => this.manageLocation(location)}
              placeholder={this.state.pinnedLocation? "Pinned Location" :"Start Typing Location or Use the Pin!"}
              onChange={() => {}}
              zIndex={100}
              initialRegion={this.state.region}
              pinnedLocation={this.state.pinnedLocation}
            />
          </View>
    
  
    <MapView
    style={Style.map}
    ref={(ref)=>this.mapView=ref}
    provider={PROVIDER_GOOGLE}
    region={this.state.region}
    onPanDrag={this.setMapDragging}
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
              onPress={() => this.returnToOriginal()} 
             style={{
                justifyContent: 'center',
                alignSelf:'flex-end',
                marginRight:30,
                height: 35,
                width: 35,
                backgroundColor: '#FF5B04',
                borderRadius:35/2,
                bottom:20,
                marginBottom:5,
                
              }}
              >
           <FontAwesomeIcon style={{alignSelf:'center'}}icon={faMapMarkerAlt} color={'white'}/>
</TouchableOpacity>
  <TouchableOpacity
              onPress={() => this.onFinish()} 
              disabled={!this.state.address}
             style={{
                justifyContent: 'center',
                height: 50,
                width: '90%',
                backgroundColor: this.state.address ? '#FF5B04' : '#CCCCCC',
                borderRadius:15,
                bottom:20,
                
              }}
              >
              <Text style={{
                color: 'white',
                fontSize:15,
                fontWeight:'bold',
                textAlign: 'center'
              }}>Set  Location</Text>
</TouchableOpacity>
      </View>
    )
  }
  
  onPickedLocation=()=>
  {
    return(
      <View style={{height}}>
           <View style={{paddingLeft:15,paddingTop:15,paddingBottom:5}}>
           <Text style={{marginBottom:10}}>Address:</Text>
        <TouchableOpacity onPress={()=>this.setState({locationPicked:false,pinnedLocation:false,address:null})}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20}}>{this.state.address}</Text>
          <FontAwesomeIcon style={{marginRight:25}} size={20}icon={faChevronRight} color={'orange'}/>
          </View>
      
        </TouchableOpacity>
        
     
        </View>
        <Divider style={{marginTop:5,height:2}}/>
        <View style={{paddingLeft:15,paddingTop:5,paddingBottom:5}}>
        <View style={{
          position: 'relative', width:'100%'
        }}>
        <Text>Address Details:</Text>
        </View>
         <TextInput
            style={{fontSize:20}}
            onChangeText={(AddressDetails) => {
              this.setState({AddressDetails})
            }}
            value={this.state.AddressDetails}
            placeholder={'Type Information'}
          />
          </View>
          <Divider style={{marginTop:5,height:2}}/>

          <View style={{paddingLeft:15,paddingTop:5,paddingBottom:5}}>
             <Text>Notes:</Text>
         <TextInput
            style={{fontSize:20}}
            onChangeText={(driverNotes) => {
              this.setState({driverNotes})
            }}
            value={this.state.AddressDetails}
            placeholder={'Type Information'}
          />
          </View>
       

        <Divider style={{marginTop:5,height:2}}/>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:25}}>
        <TouchableOpacity
              onPress={()=>{this.setState({type:"Home"})}}
              style={this.state.type=="Home" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                  color:this.state.type=="Home" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=>{this.setState({type:"Work"})}}
             style={this.state.type=="Work" ? Style.buttonPicked : Style.notPicked}
              >
              <Text style={{
                color:this.state.type=="Work" ? '#FF5B04' : '#CCCCCC',
                textAlign: 'center',
                
              }}>Work</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingTop:50,alignItems:'center'}}>
        <TouchableOpacity
              onPress={() => this.onFormSubmit()} 
              disabled={!this.state.type}
              style={{
                justifyContent: 'center',
                height: 50,
                width: '90%',
                borderRadius:15,
                backgroundColor:this.state.type ? "#FF5B04" : '#CCCCCC'
                
              }}
              >
              <Text style={{
                color: 'white',
                textAlign: 'center',
                
              }}>Submit</Text>
            </TouchableOpacity>
            </View>
       </View>
   
    )
  }
  render() {
    const { isLoading, data } = this.state;
    const { user } = this.props.state;
    return (
  <View style={{flex:1}}>
     {this.state.locationPicked?this.onPickedLocation():this.renderMap()}
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
