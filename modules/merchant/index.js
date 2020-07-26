import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faStopwatch, faCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import InView from './InViewPort'
import { Color } from 'common';
import Style from './Style'

import { merchants as DATA } from '../homepage/data-test'
const height = Math.round(Dimensions.get('window').height);

class Merchant extends Component {
  constructor(props) {
    super(props);
    this.category = [];
    this.products_categories_layout = []
    this.products_navigator_layout = []
    this.state = {
      merchant_data: null,
      active_category: null,
      cart: []
    }
  }

  componentDidMount() {
    const { merchant_id } = this.props.navigation.state.params
    const merchant_data = DATA.find(merchant => merchant.id === merchant_id)
    this.products_navigator_scrollview_ref.scrollTo({
      x: this.products_navigator_layout[0],
      y: 0,
      animated: true,
    })

    this.setState({ 
      merchant_data,
      active_category: 0,
      cart: [...this.props.state.cart]
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.cart.length !== nextProps.state.cart.length) {
      return {
        cart: [...nextProps.state.cart]
      };
    }
    return null
  }

  shouldComponentUpdate(_, nextState) {
    return (
      nextState.active_category !== this.state.active_category ||
      nextState.cart.length !== this.state.cart.length
    )
  }

  componentDidUpdate(_, prevState) {
    console.log('Component updated')
    if (prevState.active_category !== this.state.active_category) {
      this.products_navigator_scrollview_ref.scrollTo({
        x: this.products_navigator_layout[this.state.active_category],
        y: 0,
        animated: true,
      })
    }
  }

  setActiveCategory = (idx, isVisible) => {
    this.category[idx] = isVisible
    if (isVisible) {
      this.setState({ active_category: this.category.indexOf(true) })
    }
  }

  scrollToCategory = (idx) => {
    this.products_scrollview_ref.scrollTo({
      x: 0,
      y: this.products_categories_layout[idx],
      animated: true,
    })
    this.products_navigator_scrollview_ref.scrollTo({
      x: this.products_navigator_layout[idx],
      y: 0,
      animated: true,
    })
  }

  numberFormatter = (num) => (
    Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k+' : Math.sign(num)*Math.abs(num)
  )

  addToCart = (product) => {
    const { addProductToCart, removeProductToCart } = this.props
    const { cart } = this.props.state
    if (cart.find(item => item.id === product.id)) {
      removeProductToCart(product)
    } else {
      addProductToCart(product)
    }
  }

  goToCart = () => {
    console.log('Go to cart')
  }

  render() {
    const [ name, ratings, delivery_time, distance, merchant_products, logo ] = [
      this.state.merchant_data ? this.state.merchant_data.name : null,
      this.state.merchant_data ? this.state.merchant_data.ratings : null,
      this.state.merchant_data ? this.state.merchant_data.delivery_time : null,
      this.state.merchant_data ? this.state.merchant_data.distance : null,
      this.state.merchant_data ? this.state.merchant_data.merchant_products : null,
      this.state.merchant_data ? this.state.merchant_data.logo : null
    ]
    const stars = []
    if (ratings) {
      for(let i = 0; i < 5; i++) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={(ratings.avg > i) ? faStar : faStarRegular}
            size={15}
            style={{ color: Color.white, marginHorizontal: 2 }}
          />
        )
      }
    }

    const categories = merchant_products ? merchant_products.map(d => d.category) : null
    const { cart } = this.state
    const { theme } = this.props.state
    return (
      <View style={Style.MainContainer}>
        <View style={[Style.cartIconContainer, { backgroundColor: theme ? theme.primary : Color.primary }]}>
          <TouchableOpacity onPress={() => this.goToCart()}>
            <FontAwesomeIcon icon={ faShoppingCart } size={30} 
              style={{ color: theme ? theme.description === 'Darker' ? Color.white : Color.black : Color.black }}
            />
            {
              cart.length > 0 &&
              <View style={Style.cartNumItems}>
                <Text style={{ color: Color.black, fontSize: 10 }}>
                  {cart.length}
                </Text>
              </View>
            }
          </TouchableOpacity>
        </View>
        <View style={Style.upperSection}>
          <ScrollView ref={ref => this.products_scrollview_ref = ref}>
            <View style={Style.merchantHeader}>
              <Image source={ logo ? { uri: logo } : null } style={Style.image} />
              <View style={Style.overlay}></View>
              <View style={Style.merchantDetails}>
                <Text style={Style.title} numberOfLines={2}>
                  { name ? name : null }
                </Text>
                <View style={Style.ratingsContainer}>
                  <View style={Style.stars}>
                    { stars }
                  </View>
                  <Text style={Style.avgRating}>
                    { ratings ? ratings.avg : null }
                  </Text>
                  <Text style={Style.totalReviews}>
                    { ratings ? `(${this.numberFormatter(ratings.totalReviews)} reviews)` : null }
                  </Text>
                </View>
                <View style={Style.timeAndDistance}>
                  <FontAwesomeIcon icon={faStopwatch} size={14} style={{ color: Color.white }} />
                  <Text style={Style.deliveryTime}>
                    { delivery_time ? `${delivery_time} min` : null }
                  </Text>
                  <FontAwesomeIcon icon={faCircle} size={5} style={Style.circleDivider} />
                  <Text style={Style.distance}>
                    { distance ? `${distance}km` : null }
                  </Text>
                </View>
              </View>
            </View>
            <View style={Style.merchantProductsContainer}>
              {
                merchant_products && merchant_products.length > 0 ?
                merchant_products.map((d, idx) => (
                  <InView
                    key={idx}
                    onChange={ (isVisible) => this.setActiveCategory(idx, isVisible)}
                    onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.products_categories_layout[idx] = layout.y + (height*0.1);
                    }}
                  >
                    <View style={Style.section}>
                      <Text style={Style.categoryText}>
                        { d.category }
                      </Text>
                      <View style={Style.productContainer}>
                        {
                          d.products.length > 0 ?
                          d.products.map((product, idx) => (
                            <TouchableOpacity
                              key={idx}
                              onPress={() => this.addToCart(product)}
                            >
                              <View style={Style.product}>
                                <View style={Style.productDetails}>
                                  <Text
                                    style={[
                                      Style.productTitle,
                                      cart.find(item => item.id === product.id) ?
                                      { color: Color.primary } : {}
                                    ]}
                                    numberOfLines={2}
                                  >
                                    { product.title }
                                  </Text>
                                  <Text style={Style.productPrice} numberOfLines={1}>
                                    { '₱' + product.price }
                                  </Text>
                                </View>
                                <Image
                                  source={{ uri: 'https://' + product.png_img_url }}
                                  style={Style.productImg}
                                />
                              </View>
                            </TouchableOpacity>
                          ))
                          : null
                        }
                      </View>
                      <View 
                        style={{ 
                          borderBottomWidth: 1,
                          borderBottomColor: 'rgba(0,0,0,0.1)'
                        }}
                      />
                    </View>
                  </InView>
                ))
                : null
              }
            </View>
          </ScrollView>
        </View>
        <SafeAreaView style={Style.bottomSection}>
          <ScrollView
            horizontal={true}
            style={Style.ScrollViewTab}
            showsHorizontalScrollIndicator={false}
            ref={ref => this.products_navigator_scrollview_ref = ref}
          >
            <View style={Style.tabBar}>
              { 
                categories && 
                categories.map((tab, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => this.scrollToCategory(idx)}
                    onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.products_navigator_layout[idx] = layout.x;
                    }}
                    style={[
                      Style.tabItem,
                      this.state.active_category === idx ? 
                      { borderTopWidth: 2, borderColor: Color.primary } : {}
                    ]}
                  >
                    <View>
                      <Text style={ this.state.active_category === idx ? { color: Color.primary } : {}}>
                        { tab }
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    addProductToCart: (product) => dispatch(actions.addProductToCart(product)),
    removeProductToCart: (product) => dispatch(actions.removeProductToCart(product)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Merchant);