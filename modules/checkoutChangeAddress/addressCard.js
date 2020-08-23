import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Style from './addressCardStyles';
import {faUserCircle,faMapMarker,faTrash,faHome,faBuilding,faEdit} from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'react-native-elements';

class addressCard extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount()
  {
    console.log(this.props.keys)
  }

 
  render() {
    const { details } = this.props;
    return (
      <View style={Style.container}>
      
      <View  style={Style.buttonContainer}>
   <TouchableOpacity style={Style.circle} onPress={()=>this.props.pickAddress()}>
   {this.props.current===this.props.keys && (<View style={Style.checkedCircle} />)}
    </TouchableOpacity>
    <View style={Style.details}>
          <View style={{flexDirection:'row'}}>
              <Text style={Style.AddressType}>{details.type}</Text>
          </View>     
        </View>
    </View>









       
        <Divider style={{marginTop:-15,height:1}}/>
      <View style={Style.locationInformation}>
        <Text style={Style.locationText}>{details.route}</Text>
        <Text style={Style.locationText}>{`${details.locality} , ${details.country}`}</Text>
        <Text style={Style.locationText}>Notes Somewhere Here</Text>
      </View>
      </View>
    );
  }
}


export default addressCard;