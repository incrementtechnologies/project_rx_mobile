import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  faUserCircle,
  faMapMarker,
  faUniversity,
  faKaaba,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR PRODUCTS
import { mainFeaturedProduct, featuredProducts, promo, products } from './data-test';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null
    };
  }

  componentDidMount() {
    const { user } = this.props.state;
    if (user != null) {
    }
  }

  redirect = route => {
    this.props.navigation.navigate(route);
  };

  FlatListItemSeparator = () => {
    return <View style={BasicStyles.Separator} />;
  };

  render() {
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
      <ScrollView
        style={Style.ScrollView}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y <= 0) {
          }
        }}>
        <View
          style={[
            Style.MainContainer,
            {
              minHeight: height,
            },
          ]}>
          {isLoading ? <Spinner mode="overlay" /> : null}

          {/* Main Feature Product */}
          <Text style={{ fontSize: 17, fontWeight: '600' }}>Main Featured Product</Text>
          <MainFeature details={mainFeaturedProduct} />

          {/* Scrollable Features */}
          <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 10 }}>Scrollable Featured Products</Text>
          <View style={{ height: 150, marginBottom: 10 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                featuredProducts.map(promo => (
                  <Feature key={promo.id} details={promo} />
                ))
              }
            </ScrollView>
          </View>

          {/* Promo Card */}
          <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 10 }}>Promo Card</Text>
          <View style={{ marginBottom: 10 }}>
            <PromoCard details={promo} />
          </View>

          {/* Product Card */}
          <Text style={{ fontSize: 17, fontWeight: '600'}}>Product Card</Text>
          <View style={{ height: 180 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                products.map(product => (
                  <Card key={product.id} details={product} />
                ))
              }
            </ScrollView>
          </View>

          {/* Main Product Card */}
          <Text style={{ fontSize: 17, fontWeight: '600' }}>Main Product Card</Text>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '98%' }}>
              {
                products.map(product => (
                  <MainCard key={product.id} details={product} />
                ))
              }
            </View>
          </View>

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
)(Dashboard);
