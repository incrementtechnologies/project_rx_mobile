import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Spinner } from 'components';
import { Card, MainCard } from 'components/ProductThumbnail'
import { Color, Routes } from 'common'
import Api from 'services/api/index.js'
import Style from './Style.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR CATEGORIES TAB PRODUCTS
import { products, UserLocation } from './data-test';
// const ProductCategories = [
//   'Filipino Choices',
//   'Asian Choices',
//   'Korean Barbeque Choices',
//   'Fast Food Choices',
//   'Milk Tea Choices'
// ]

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      categories: [],
      products: [],
      selected_category: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    Api.request(Routes.dashboardRetrieveCategoryList, {},
    (response) => {
    
      const categories = [...response]
      this.setState({ categories })
      const parameter = {
        condition: categories.map(category => {
          return { 
            column: 'category',
            clause: '=',
            value: category
          }
        }),
        latitude: UserLocation.latitude,
        longitude: UserLocation.longitude
      }
  
      Api.request(Routes.dashboardRetrieveCategoryProducts, parameter, response => {
       
        if (response.data.length) {
          const data = response.data.map((products, idx) => {
            return {
              category: categories[idx].category,
              data: products
            }
          })
          this.setState({
            isLoading: false,
            products: data
          })
        }   
      }, (error) => {
        console.log({ errorCategoryProducts: error })
        this.setState({
          isLoading: false,
          isError: true,
          errorMessage: 'Error fetching products'
        })
      })
    },
    (error) => {
      console.log({ errorCategoryList: error })
      this.setState({ categories: [] })
    })
  }

  viewMoreProducts = (category) => {
    const { navigate } = this.props.navigation
    const _category = this.state.products.find(product => product.category === category)
    if (_category.data.length) {
      return (
        _category.data.map(details => (
          <TouchableOpacity
            key={details.id}
            onPress={() => navigate('Merchant', { merchant_id: details.merchant_id })}
          >
          <MainCard details={details} />
        </TouchableOpacity>
        ))
      )
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 200}}>
          <Text>Coming Soon!</Text>
        </View>
      )
    }
  }

  render() {
    const { isLoading, products } = this.state
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          ref={ref => this.ScrollViewRef = ref}
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
            { isLoading ? <Spinner mode="overlay" /> : null }
            {
              this.state.selected_category
              ? (
                  <View style={{ width: '100%' }}>
                    <TouchableOpacity onPress={() => this.setState({ selected_category: null })}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <FontAwesomeIcon
                          icon={faArrowCircleLeft}
                          size={20}
                          style={{ color: Color.darkGray, marginRight: 5 }}
                        />
                        <Text style={{ color: Color.darkGray, fontSize: 12 }}>
                          Go back
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', marginTop: 20, padding: 5 }}>
                      <Text style={{ fontSize: 17, fontWeight: '600'}}>
                        {this.state.selected_category}
                      </Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                      {
                        this.viewMoreProducts(this.state.selected_category)
                      }
                    </View>
                  </View>
                )
              : (
                  products.map((product, idx) => (
                    <View key={idx}>
                      <View style={{ 
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 5,
                          marginVertical: 10
                        }}
                      >
                        <Text style={{ fontSize: 17, fontWeight: '600'}}>
                          {product.category}
                        </Text>
                        <TouchableOpacity onPress={() => {
                          this.setState({ selected_category: product.category })
                          this.ScrollViewRef.scrollTo({
                            x: 0,
                            y: 0,
                            animated: true
                          })
                        }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text
                              style={{ 
                                color: Color.darkGray,
                                fontSize: 12,
                                marginRight: 5
                              }}
                            >
                              View more
                            </Text>
                            <FontAwesomeIcon
                              icon={faArrowCircleRight}
                              size={15}
                              style={{ color: Color.darkGray }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      {
                        product.data.length
                        ? (
                            <View style={{ height: 180 }}>
                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                { 
                                  product.data.map(details => {
                                    return (
                                      <TouchableOpacity
                                        key={details.id}
                                        onPress={() => navigate('Merchant', { merchant_id: details.merchant_id })}
                                      >
                                        <Card details={details} />
                                      </TouchableOpacity>
                                    )
                                  })
                                }
                              </ScrollView>
                            </View>
                          )
                        : (
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 100}}>
                              <Text>Coming Soon!</Text>
                            </View>
                          )
                      }
                    </View>
                  ))
                )
            }
            <Text
              style={{ 
                fontSize: 11,
                marginLeft: 5,
                marginBottom: 10
              }}
            >
              Can't find what you're looking for? Try searching!
            </Text>
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
)(Categories);
