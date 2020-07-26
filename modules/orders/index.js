import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'components';
import Api from 'services/api';
import { Routes, Helper, BasicStyles, Color } from 'common';
import Style from './Style';

import OrderCard from './OrderCard';

const DATA = [
  { orderNum: 'JTWKWKRPAQWE', to: 'M28, Nasipit Talamban, Cebu, Cebu City', amount: '₱350.00', status: 'pending' },
  { orderNum: 'QWEFKELWQ14D', to: 'M28, Nasipit Talamban, Cebu, Cebu City', amount: '₱450.00', status: 'cancelled' },
  { orderNum: 'XMQQWEJCJRL1', to: 'M28, Nasipit Talamban, Cebu, Cebu City', amount: '₱1650.00', status: 'completed' },
  { orderNum: 'CJRODL1J46LF', to: 'M28, Nasipit Talamban, Cebu, Cebu City', amount: '₱750.00', status: 'completed' },
  { orderNum: 'CMQKNRF2KJ23', to: 'M28, Nasipit Talamban, Cebu, Cebu City', amount: '₱655.00', status: 'completed' },
  { orderNum: '43KJQKXIFJ4L', to: 'M28, Nasipit Talamban, Cebu, Cebu City', amount: '₱253.00', status: 'completed' },
]

class MyOrders extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    // this.retrieve()
  }

  retrieve = () => {
    const { user } = this.props.state;
    if(user === null) {
      const proceedToLogin = NavigationActions.navigate({
        routeName: 'loginStack'
      });
      this.props.navigation.dispatch(proceedToLogin)
      return
    }

    console.log('Retriving user orders')
  }

  render() {
    const { user, theme } = this.props.state
    console.log({ user })
    const { isLoading } = this.state
    return (
      <ScrollView style={Style.ScrollView} showsVerticalScrollIndicator={false}>
        { isLoading ? <Spinner mode="overlay"/> : null }
        <View style={Style.MainContainer}>
          <View style={[Style.header, { backgroundColor: theme ? theme.primary : Color.primary }]}>
            <Text style={Style.textWhite}>Order History</Text>
          </View>
          {
            user === null ? 
            <View style={Style.notLoggedIn}>
              <FontAwesomeIcon
                icon={faBan}
                size={30}
                style={{
                  color: Color.danger,
                  marginRight: 10
                }}
              />
              <Text>You must log in first</Text>
            </View>
            :
            <View style={Style.orderHistory}>
              {
                DATA.map((order, idx) => (
                  <OrderCard key={idx} data={order} />
                ))
              }
            </View>
          }
        </View>
      </ScrollView>
    )
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
)(MyOrders);