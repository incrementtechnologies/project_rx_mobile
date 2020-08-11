import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import Style from './Style.js';
import { Spinner } from 'components';
import { ShopThumbnail } from 'components';
import { Routes } from 'common';
import Api from 'services/api/index.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR PRODUCTS
import { merchants, UserLocation } from './data-test';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      isError: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    const parameter = {
      limit: 100,
      offset: 0,
      sort: 'name',
      latitude: UserLocation.latitude,
      longitude: UserLocation.longitude
    }
    Api.request(Routes.dashboardRetrieveShops, parameter, response => {
     
      if (response.data.length) {
        this.setState({ isLoading: false, data: response.data[0] })
      }   
    }, (error) => {
      console.log({ errorShops: error })
      this.setState({ isLoading: false, isError: true })
    });
  }

  render() {
    const { isLoading, data } = this.state;
    const { navigate } = this.props.navigation

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={Style.ScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              Style.MainContainer,
              {
                minHeight: height,
                paddingBottom: 150
              },
            ]}>
            {isLoading ? <Spinner mode="overlay" /> : null}
{/* 
            {
              merchants.length > 0 ?
              <View style={{ paddingTop: 10 }}>
                {
                  merchants.map((merchant, id) => (
                    <TouchableOpacity key={id} onPress={() => navigate('Merchant', { merchant_id: merchant.id })}>
                      <ShopThumbnail details={merchant} />
                    </TouchableOpacity>
                  ))
                }
              </View>
              : null
            } */}
            {
              data && data.length > 0 && (
                <View style={{ paddingTop: 10 }}>
                  {
                    data.map((merchant, id) => (
                      <TouchableOpacity key={id} onPress={() => navigate('Merchant', { merchant_id: merchant.id })}>
                        <ShopThumbnail details={merchant} />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              )
            }
          
          </View>
        </ScrollView>
      </SafeAreaView>
    );
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
)(Shops);
