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
import OrderCard from './OrderCard';
import Api from 'services/api';
import { Routes, Helper, BasicStyles, Color } from 'common';
import Style from './Style';

class MyOrders extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      data: []
    }
  }

  componentDidMount() {
    this.retrieve()
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

    const parameter = {
      condition: [{
        column: 'account_id',
        clause: '=',
        value: user.id
      }, {
        column: 'order_number',
        clause: '!=',
        value: null
      }],
      sort: {
        created_at: 'desc'
      }
    }

    this.setState({ isLoading: true })
    Api.request(Routes.ordersRetrieve, parameter, response => {
      if (response.data.length) {
        this.setState({ isLoading: false, data: response.data })
      } else {
        this.setState({ isLoading: true })
      }
    }, error => {
      console.log({ RetrievingOrdersError: error })
      this.setState({ isLoading: true })
    })
  }

  render() {
    const { user, theme } = this.props.state
    const { isLoading, data } = this.state
    return (
      <ScrollView style={Style.ScrollView} showsVerticalScrollIndicator={false}>
        <View style={Style.MainContainer}>
          <View style={[Style.header, { backgroundColor: theme ? theme.primary : Color.primary }]}>
            <Text style={Style.textWhite}>Order History</Text>
          </View>
          { isLoading
            ? (<View style={{ marginTop: 50 }}>
                <Spinner mode="overlay"/> 
              </View>)
            : null 
          }
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
                data.length > 0 && data.map((delivery, idx) => (
                  <OrderCard key={idx} data={delivery} {...this.props} />
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