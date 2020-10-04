import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import SwipeableFlatList from 'react-native-swipeable-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBan, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'components';
import OrderCard from './OrderCard';
import Api from 'services/api';
import { Routes, Color } from 'common';
import Style from './Style';
const width = Math.round(Dimensions.get('window').width);

const ItemOptions = ({ goToMessenger, status }) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }}>
      <TouchableHighlight
        style={{
          width: (width / 5),
          backgroundColor: status === 'completed' ? Color.gray : Color.danger,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          if (status === 'completed') return
          goToMessenger()
        }}
        underlayColor={Color.gray}
      >
        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FontAwesomeIcon
            icon={ faEnvelope }
            style={ {color: Color.white }}
            size={24}
          />
          <Text style={{ color: Color.white }}>
            Message
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

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
        this.setState({ isLoading: false })
      }
    }, error => {
      console.error({ RetrievingOrdersError: error })
      this.setState({ isLoading: false })
    })
  }

  goToMessenger(details) {
    this.props.navigation.navigate('MessengerMessages', { 
      checkoutData: {
        id: details.id,
        code: details.code,
        merchantId: details.merchant_id
      },
      messengerHeaderTitle: `***${details.code.slice(-8)}`
    });
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: 0.5,
        width: width,
        backgroundColor: Color.gray
      }}/>
    );
  };

  render() {
    const { user, theme } = this.props.state
    const { isLoading, data } = this.state
    const { navigate } = this.props.navigation

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
                data.length > 0 ? (
                  <SwipeableFlatList
                    data={data}
                    renderItem={(delivery) => (
                        <OrderCard
                          key={delivery.index}
                          data={delivery.item}
                          {...this.props}
                        />
                    )}
                    maxSwipeDistance={width / 5}
                    renderQuickActions={(delivery) => (
                      <ItemOptions
                        status={delivery.item.status}
                        goToMessenger={() => this.goToMessenger(delivery.item)}
                      />
                    )}
                    contentContainerStyle={{
                      flexGrow: 1
                    }}
                    shouldBounceOnMount={true}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                  />
                ) : isLoading === false && (
                  <View style={{ marginTop: '20%', alignItems: 'center' }}>
                    <Text>Looks like you don't have any orders yet</Text>
                    <Text>What are you waiting for? {''}
                      <Text
                        onPress={() => navigate('Homepage')}
                        style={{ color: Color.primary, fontWeight: 'bold' }}
                      >
                        Order now!
                      </Text>
                    </Text>
                  </View>
                )
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