import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import _, { isError } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faStopwatch, faCircle, faShoppingCart, faImage, faBan } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Spinner} from 'components'
import InView from './InViewPort'
import { Color, Routes } from 'common'
import Config from 'src/config.js'
import Api from 'services/api/index.js'
import Style from './Style'
const height = Math.round(Dimensions.get('window').height);

// Test Data for user location
import { UserLocation } from '../homepage/data-test'

class Merchant extends Component {
  constructor(props) {
    super(props);
    this.category = [];
    this.products_categories_layout = []
    this.products_navigator_layout = []
    this.state = {
      isLoading: false,
      isError: false,
      errorMessage: null,
      merchant_data: null,
      categories: null,
      products: null,
      active_category: null
    }
  }

  componentDidMount() {
    this.retrieve()
  }

  retrieve = () => {
    this.setState({ isLoading: true })
    const { merchant_id } = this.props.navigation.state.params

    const shop_parameter = {
      id: merchant_id,
      latitude: UserLocation.latitude,
      longitude: UserLocation.longitude
    }
    Api.request(Routes.dashboardRetrieveShops, shop_parameter, response => {
      if (response.data.length) {
        this.setState({
          merchant_data: response.data[0][0]
        })
      }   
    }, (error) => {
      console.log({ error })
      this.setState({
        isLoading: false,
        isError: true,
        errorMessage: 'Error fetching merchant'
      })
    });
    
    const products_parameter = {
      inventory_type: null,
      account_id: merchant_id,
      condition : [{
          column: 'merchant_id',
          clause: '=',
          value: merchant_id
      }]
    }
    Api.request(Routes.productsRetrieve, products_parameter, response => {
      const categories = _.uniqBy(response.data, 'tags').map(data => data.tags)
      if (response.data.length) {
        this.setState({
          isLoading: false,
          categories,
          active_category: 0,
          products: response.data
        })
      } else {
        this.setState({
          isLoading: false,
          products: null
        })
      }
    }, (error) => {
      this.setState({
        isLoading: false,
        isError: true,
        errorMessage: 'Error fetching products'
      })
    });
  }

  // shouldComponentUpdate(_, nextState) {
  //   return (
  //     nextState.active_category !== this.state.active_category ||
  //     nextState.cart.length !== this.state.cart.length
  //   )
  // }

  componentDidUpdate(_, prevState) {
    if (prevState.active_category !== this.state.active_category && isError === false) {
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
    Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'k+' : Math.sign(num)*Math.abs(num)
  )

  addToCart = (item) => {
    const { addProductToCart, removeProductToCart } = this.props
    const { user, cart } = this.props.state
    const data = [...cart]

    if (user == null) {
      const proceedToLogin = NavigationActions.navigate({
        routeName: 'loginStack'
      });
      this.props.navigation.dispatch(proceedToLogin)
      return
    }

    const product = {...item}

    // initialize quantitiy
    product.quantity = 1

    // checking if unique merchant (RETURN IF UNIQUE)
    const isDifferentMerchant = _.uniqBy([...data, product], 'merchant_id').length > 1
    if (isDifferentMerchant) {
      Alert.alert('Notice', 'Sorry, ordering to multiple merchants is not allowed yet')
      return
    }

    // checking if item is already added in cart (REMOVING IF FOUND)
    const isRemoving = data.find(item => item.id === product.id)
  
    let updatedItems
    if (isRemoving) {
      updatedItems = _.remove(data, (item) => item.id !== product.id)
    } else {
      updatedItems = [...data, product]
    }

    const stringifyItems = JSON.stringify(updatedItems)
    const parameter = {
      account_id: user.id,
      items: stringifyItems
    }

    this.setState({ isLoading: true })
    Api.request(Routes.cartsCreate, parameter, response => {
      if (isRemoving) {
        removeProductToCart(product)
      } else {
        addProductToCart(product)
      }
      this.setState({ isLoading: false })
    }, error => {
      console.log({ error })
      this.setState({ isLoading: false })
      Alert.alert('Notice', 'Connection error, try again')
    })
  }

  goToCart = () => {
    this.props.navigation.navigate('Cart')
  }

  render() {
    const { isLoading, isError } = this.state
    const { theme, cart } = this.props.state
    const [ 
      name,
      logo,
      ratings,
      delivery_time,
      distance,
      categories,
      products
    ] = [
      /* name */           this.state.merchant_data ? this.state.merchant_data.name : null,
      /* logo */           this.state.merchant_data ? this.state.merchant_data.logo : null,
      /* ratings */        this.state.merchant_data ? this.state.merchant_data.rating : null,
      /* delivery_time */  25,
      /* distance */       this.state.merchant_data ? this.state.merchant_data.distance : null,
      /* categories */     this.state.categories,
      /* products */       this.state.products
    ]

    const MerchantImage = (
      logo == null 
      ? (
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faImage} size={150} style={{ color: theme ? theme.primary : Color.primary }} />
          </View>
        )
      : <Image source={ logo ? { uri: Config.BACKEND_URL + logo } : null } style={Style.image} />
    )

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

    if (isError) {
      return (
        <View style={Style.MainContainer}>
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>{ this.state.errorMessage }</Text>
          </View>
        </View>
      )      
    }


    return (
      <View style={Style.MainContainer}>
        {isLoading ? <Spinner mode="overlay" /> : null}
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
          <ScrollView
            ref={ref => this.products_scrollview_ref = ref}
            onScroll={(event) => {
              if (event.nativeEvent.contentOffset.y < 0) {
                if (isLoading == false) {
                  this.retrieve()
                }
              }
            }}
          >
            <View style={Style.merchantHeader}>
              { MerchantImage }
              {/* <Image source={ logo ? { uri: logo } : null } style={Style.image} /> */}
              <View style={Style.overlay}></View>
              <View style={Style.merchantDetails}>
                <Text style={Style.title} numberOfLines={2}>
                  { name != null ? name : null }
                </Text>
                <View style={Style.ratingsContainer}>
                  <View style={Style.stars}>
                    { stars }
                  </View>
                  <Text style={Style.avgRating}>
                    { ratings != null ? ratings.avg : null }
                  </Text>
                  <Text style={Style.totalReviews}>
                    { ratings != null ? `(${this.numberFormatter(ratings.total)} reviews)` : null }
                  </Text>
                </View>
                <View style={Style.timeAndDistance}>
                  <FontAwesomeIcon icon={faStopwatch} size={14} style={{ color: Color.white }} />
                  <Text style={Style.deliveryTime}>
                    { delivery_time != null ? `${delivery_time} min` : null }
                  </Text>
                  <FontAwesomeIcon icon={faCircle} size={5} style={Style.circleDivider} />
                  <Text style={Style.distance}>
                    { distance != null ? `${distance.toFixed(2)}km` : null }
                  </Text>
                </View>
              </View>
            </View>
            <View style={Style.merchantProductsContainer}>
              {
                products && categories && products.length > 0 && categories.length > 0 && 
                (
                  categories.map((category, idx) => (
                    <InView
                      key={idx}
                      disabled={true}
                      onChange={ (isVisible) => this.setActiveCategory(idx, isVisible)}
                      onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        this.products_categories_layout[idx] = layout.y + (height*0.1);
                      }}
                    >
                      <View style={Style.section}>
                        <Text style={Style.categoryText}>
                          { category }
                        </Text>
                        <View style={Style.productContainer}>
                          {
                            products && products.length > 0 ?
                            products.map((product, idx) => {
                              if (product.tags === category) {
                                return (
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
                                            { color: theme ? theme.description === 'Darker' ? Color.secondary : Color.primary : Color.primary } : {}
                                          ]}
                                          numberOfLines={2}
                                        >
                                          { product.title }
                                        </Text>
                                        {
                                          product.price && product.price.length && (
                                            <Text style={Style.productPrice} numberOfLines={1}>
                                              { '₱' + product.price[0].price }
                                            </Text>
                                          )
                                        }
                                      </View>
                                      {
                                        product.featured && product.featured.length && (
                                          <Image
                                            source={{ uri: Config.BACKEND_URL + product.featured[0].url }}
                                            style={Style.productImg}
                                          />
                                        )
                                      }
                                    </View>
                                  </TouchableOpacity>
                                )
                              }
                            })
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
                )
              }
              {
                isLoading === false && products == null && categories == null && (
                  <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Coming soon!</Text>
                  </View>
                ) 
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