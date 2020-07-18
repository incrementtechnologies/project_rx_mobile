import React, { Component } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Style from './Style.js';
import { Spinner } from 'components';
import { ShopThumbnail } from 'components'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR PRODUCTS
import { merchants } from './data-test';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null
    };
  }

  componentDidMount() {
    const { user } = this.props.state;
    if (user != null) {
    }
  }

  render() {
    const { isLoading, data } = this.state;
    const { navigate } = this.props.navigation
    return (
      <ScrollView
        style={Style.ScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            Style.MainContainer,
            {
              minHeight: height,
            },
          ]}>
          {isLoading ? <Spinner mode="overlay" /> : null}

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
          }
        
        </View>
      </ScrollView>
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
