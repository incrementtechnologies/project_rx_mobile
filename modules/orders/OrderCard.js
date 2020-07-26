import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faTimesCircle, faMinusCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Style from './Style';
import { Color } from 'common';

const CompletedIcon = () => <FontAwesomeIcon icon={faCheckCircle} size={30} style={{ color: Color.success}} />
const PendingIcon = () => <FontAwesomeIcon icon={faMinusCircle} size={30} style={{ color: Color.warning}} />
const CancelledIcon = () => <FontAwesomeIcon icon={faTimesCircle} size={30} style={{ color: Color.danger}} />
const DefaultIcon = () => <FontAwesomeIcon icon={faExclamationCircle} size={30} style={{ color: Color.darkGray}} />

class OrderCard extends Component {
  goToOrderDetails(detail) {
    Alert.alert(`Order details: ${detail}`)
  }

  render() {
    const { data } = this.props
    let icon = null
    switch (data.status) {
      case 'completed':
        icon = <CompletedIcon />
        break
      case 'pending':
        icon = <PendingIcon />
        break
      case 'cancelled':
        icon = <CancelledIcon />
        break
      default:
        icon = <DefaultIcon />
        break
    }
    return (
      <TouchableOpacity onPress={() => this.goToOrderDetails(data.status)}>
        <View style={Style.orderCard}>
          <View style={{ flex: 0.8}}>
            <View>
              <Text style={{ fontWeight: '700' }} numberOfLines={2}>
                Order Number: {data.orderNum}
              </Text>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text numberOfLines={2}>
                <Text style={{ fontWeight: '600' }}>
                  Delivery To: {' '}
                </Text>
                <Text>
                  {data.to}
                </Text>
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <View>
              <Text style={{ fontWeight: '600' }}>
                {data.amount}
              </Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text>
                { icon }
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default OrderCard
