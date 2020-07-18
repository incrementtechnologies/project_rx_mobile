import React, { Component } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Style from './Style.js';
import { Spinner } from 'components';
import { MainCard, Feature, MainFeature, PromoCard } from 'components/ProductThumbnail'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR PRODUCTS
import { mainFeaturedProduct, featuredProducts, promo, products } from './data-test';

class Featured extends Component {
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
      <ScrollView showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            Style.MainContainer,
            {
              minHeight: height,
            },
          ]}>
          {isLoading ? <Spinner mode="overlay" /> : null}

          {/* Main Feature Product */}
          <TouchableOpacity onPress={() => navigate('Merchant', mainFeaturedProduct)}>
            <MainFeature details={mainFeaturedProduct} />
          </TouchableOpacity>

          {/* Scrollable Features */}
          <View style={{ height: 150, marginBottom: 10 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                featuredProducts.map(featuredProduct => (
                  <TouchableOpacity
                    key={featuredProduct.id}
                    onPress={() => navigate('Merchant', featuredProduct)}
                  >
                    <Feature details={featuredProduct} />
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>

          {/* Divider */}
          <View 
            style={{ 
              borderBottomColor: 'rgba(0,0,0,0.1)',
              borderBottomWidth: 2,
              marginVertical: 5
            }}
          />

          {/* Promo Card */}
          <View style={{ marginVertical: 10 }}>
            <PromoCard details={promo} />
          </View>

          {/* Main Product Card */}
          <View style={{ alignItems: 'center' }}>
            {/* width: 98% !important */}
            <View style={{ width: '98%' }}>
              {
                products.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    onPress={() => navigate('Merchant', product)}
                  >
                    <MainCard key={product.id} details={product} />
                  </TouchableOpacity>
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
)(Featured);
