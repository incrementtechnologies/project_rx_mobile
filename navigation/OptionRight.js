import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, Dimensions } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { Color, BasicStyles } from 'common';

const width = Math.round(Dimensions.get('window').width);
import { connect } from 'react-redux';
class NavigationDrawerStructureRight extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }
  goTo = (screen) => {
    this.props.navigationProps.navigate(screen)
  }

  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigationProps.dispatch(navigateAction);
    // const { setActiveRoute } = this.props;
    // setActiveRoute(route)
  }
  
  render() {
    const { notifications, user, activeRoute } = this.props.state;
    const { theme, cart } = this.props.state
    return (
      <View style={{
        flexDirection: 'row',
        width: width - (width * .10)
      }}>

      <TouchableOpacity
        onPress={() => this.goTo('selectLocation')}
        style={{
          width: '85%'
        }}>
          <View style={{
            width: '100%',
            flexDirection: 'row'
          }}>
            <FontAwesomeIcon icon={ faMapMarker } size={15} style={[BasicStyles.iconStyle, {
                  color: Color.primary
                }]}/>
            <Text style={{
              fontSize: 12
            }}>
              Casili, Casili, Consolacion
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{
          width: '15%'
        }}>
          <TouchableOpacity onPress={() => this.goTo('Cart')}>
            <View style={{ flexDirection: 'row', position: 'relative' }}>
              <FontAwesomeIcon
                icon={ faShoppingCart }
                size={15}
                style={[BasicStyles.iconStyle, { color: Color.black}]}
              />
              {
                cart.length > 0 &&
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    backgroundColor: theme ? theme.primary : Color.primary,
                    top: 5,
                    left: 20,
                    width: 12,
                    height: 12,
                    borderRadius: 6
                  }}
                >
                  <Text style={{ color: Color.white, fontSize: 9 }}>
                    {cart.length}
                  </Text>
                </View>
              }
            </View>
          </TouchableOpacity>   
        </View>
        
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setActiveRoute: (route) => dispatch(actions.setActiveRoute(route))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(NavigationDrawerStructureRight);