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

 
  render() {
    const { details } = this.props;
    return (
      <View style={Style.container}>
   
        <View style={Style.details}>
          <View style={{flexDirection:'row'}}>
              <FontAwesomeIcon size={24} icon={faHome} color={'#FF5B04'}/>
              <Text style={Style.AddressType}>{details.type}</Text>
          </View>     
          <View style={Style.editDeleteIcons}>
              <FontAwesomeIcon style={{marginRight:25}}size={24} icon={faEdit} color={'#FF5B04'}/>
              <FontAwesomeIcon size={23} icon={faTrash} color={'#FF5B04'}/>
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