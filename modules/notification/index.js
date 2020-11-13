import React, { Component } from 'react';
import Style from './Style.js';
import { View, Text, ScrollView, FlatList, TouchableHighlight, Alert} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import { Empty } from 'components';
import Api from 'services/api/index.js';
import { Dimensions } from 'react-native';
const height = Math.round(Dimensions.get('window').height);
class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      isLoading: false
    }
  }

  FlatListItemSeparator = () => {
    return (
      <View style={BasicStyles.Separator}/>
    );
  };

  componentDidMount(){
    this.retrieve()
  }

  retrieve = () => {
    const { setNotifications } = this.props;
    const { user } = this.props.state;
    if(user == null){
      return
    }
    let parameter = {
      account_id: user.id
    }
    this.setState({isLoading: true})
    Api.request(Routes.notificationsRetrieve, parameter, notifications => {
      this.setState({isLoading: false})
      setNotifications(notifications.size, notifications.data)
    }, error => {
      console.log('error', error)
    })
  }

  redirect(params){
    const { route, data } = params

    switch (route) {
      case 'MessengerMessages':
        this.props.navigation.navigate(route, { 
          checkoutData: {
            code: data,
          },
          messengerHeaderTitle: `***${data.slice(-8)}`
        });
        break;
      case 'MyOrderDetails':
        this.props.navigation.navigate(route, { checkoutId: data });
        break;
      default:
        const reset = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({
            routeName: route
          })]
        });
        this.props.navigation.dispatch(reset);
        break;
    }
  }

  updateNotification = (notification, params) => {
    const { setNotifications } = this.props;
    const { user } = this.props.state;

    if (user == null) return

    let parameter = { id: notification.id }
    Api.request(Routes.notificationUpdate, parameter, response => {
      let retrieveParameter = {
        account_id: user.id
      }
      Api.request(Routes.notificationsRetrieve, retrieveParameter, notifications => {
        setNotifications(notifications.size, notifications.data);
      });
    })

    this.redirect(params)
  }

  viewNotification = (notification, index) => {
    console.log({ notification })
    const { notifications } = this.props.state;

    let params = {
      route: null,
      data: null
    }
    switch(notification.payload){
      case 'thread':
        params.route = 'MessengerMessages'
        params.data = notification.route.split('/')[2]
        break;
      case 'new_delivery':
        params.route = 'MyOrderDetails'
        params.data = notification.route
        break;
      default: break;
    }

    if (params.route === null) {
      Alert.alert('Notice', `Invalid route`)
      return
    }

    if (notifications.unread > index) {
      this.updateNotification(notification, params);
    } else {
      this.redirect(params)
    }
  }

  render() {
    const { notifications } = this.props.state;
    const { selected, isLoading } = this.state;

    return (
      <ScrollView
        style={Style.ScrollView}
        onScroll={(event) => {
          if(event.nativeEvent.contentOffset.y <= 0) {
            if(this.state.isLoading == false){
              this.retrieve()
            }
          }
        }}
        >
        {notifications == null || (notifications != null && notifications.notifications == null) && (<Empty refresh={true} onRefresh={() => this.retrieve()}/>)}
        {isLoading ? <Spinner mode="overlay"/> : null }
        <View style={[Style.MainContainer, {
          minHeight: height
        }]}>
          {
            notifications && (
              <FlatList
                data={notifications.notifications}
                extraData={selected}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item, index }) => (
                  <View style={{ borderBottomWidth: 1, borderBottomColor: Color.gray }}>
                    <TouchableHighlight
                      onPress={() => {this.viewNotification(item, index)}}
                      underlayColor={Color.gray}
                      >
                      <View style={[Style.TextContainer, {
                        backgroundColor: notifications.unread > index ? Color.lightGray : Color.white
                      }]}>
                        <Text
                          style={[BasicStyles.titleText, {
                            paddingTop: 10
                          }]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[BasicStyles.normalText, { color: Color.darkGray }]}>
                          {item.description}
                        </Text>

                        <Text
                          style={[BasicStyles.normalText, {
                            paddingBottom: 10,
                            color: Color.darkGray
                          }]}>
                          {item.created_at_human}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setNotifications: (unread, notifications) => dispatch(actions.setNotifications(unread, notifications))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);