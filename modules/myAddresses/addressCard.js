import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Style from './addressCardStyles';
import {Color} from 'common';
import {faUserCircle,faMapMarker,faTrash,faHome,faBuilding,faEdit} from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';


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
              <FontAwesomeIcon size={24} icon={faHome} color={this.props.state.theme ? this.props.state.theme.primary : Color.primary}/>
              {/* <Text style={Style.AddressType}>{details.address_type}</Text> */}
          </View>     
          {/* <View style={Style.editDeleteIcons}>
            <TouchableOpacity onPress={()=>this.props.press()}>
              <FontAwesomeIcon style={{marginRight:25}}size={24} icon={faEdit} color={this.props.state.theme ? this.props.state.theme.primary : Color.primary}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.props.delete()}>
              <FontAwesomeIcon size={23} icon={faTrash} color={this.props.state.theme ? this.props.state.theme.primary : Color.primary}/>
              </TouchableOpacity>
          </View> */}
        </View>
        <Divider style={{marginTop:-15,height:1}}/>
      <View style={Style.locationInformation}>
        <Text style={Style.locationText}>{details.route}</Text>
        <Text style={Style.locationText}>{`${details.locality} , ${details.country}`}</Text>
        {/* <Text style={Style.locationText}>Notes Somewhere Here</Text> */}
      </View>
     
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(addressCard);

