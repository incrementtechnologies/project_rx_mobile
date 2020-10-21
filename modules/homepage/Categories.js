import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import _, { join, update } from 'lodash';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Spinner } from 'components';
import { Card, MainCard } from 'components/ProductThumbnail'
import { Color, Routes } from 'common'
import Api from 'services/api/index.js'
import Style from './Style.js';
import GetDeviceLocation from './getDeviceLocation';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA USER LOC.
import { UserLocation } from './data-test';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      isFetchingMoreProduct: false,
      categories: [],
      products: [],
      selected_category: null,
      limit: 10,
      offset: 0,
      productsLimit: 5,
      productsOffset: 0
    };
  }

  componentDidMount() {
    const { location } = this.props.state

    if (location) {
      this.retrieve({ newOffset: this.state.offset, changedAddress: location })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentLoc = this.props.state.location
    const nextLoc = nextProps.state.location
    const isEqual = _.isEqual(currentLoc, nextLoc)

    if (!isEqual) {
      this.setState({ categories: [], products: [], offset: 0 })
      this.retrieve({ newOffset: 0, changedAddress: nextLoc })
    }
  }

  retrieve = async ({ newOffset, changedAddress = { latitude: null, longitude: null } }) => {
    const { limit, productsLimit } = this.state

    const latitude = changedAddress.latitude
    const longitude = changedAddress.longitude

    this.setState({ isLoading: true, isError: false })
    Api.request(Routes.dashboardRetrieveCategoryList, { limit, offset: newOffset }, (response) => {
      const AllCategories = _.uniqBy([...this.state.categories, ...response ], 'category')
      const newCategories = [...response]

      if (newCategories.length > 0) {
        this.setState({ categories: AllCategories, offset: newOffset })
        const parameter = {
          condition: newCategories.map(data => {
            return { 
              column: 'category',
              clause: '=',
              value: data.category
            }
          }),
          latitude,
          longitude,
          limit: productsLimit,
          offset: 0,
        }

        Api.request(Routes.dashboardRetrieveCategoryProducts, parameter, response => {
          if (response.data.length) {
            const data = response.data.map((products, idx) => {
              return {
                category: newCategories[idx].category,
                data: products
              }
            })
            const joinedData = _.uniqBy([...this.state.products, ...data ], 'category')
            this.setState({ isLoading: false, products: joinedData })
          }   
        }, (error) => {
          console.log({ errorCategoryProducts: error })
          this.setState({
            isLoading: false,
            isError: true
          })
        })
      } else {
        this.setState({ isLoading: false })
      }
    },
    (error) => {
      console.log({ errorCategoryList: error })
      this.setState({
        categories: [],
        products: [],
        isLoading: false,
        isError: true
      })
    })
  }

  onPullRefreshCategories = ({ contentOffset }) => {
    const { offset, isLoading } = this.state
    if (contentOffset.y < -30 && !isLoading) {
      this.retrieve({ newOffset: offset })
    }
  }

  isOnBottomCategories = ({layoutMeasurement, contentOffset, contentSize}) => {
    const { offset, limit, isLoading } = this.state
    const shouldFetchData = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (shouldFetchData && !isLoading) {
      this.retrieve({ newOffset: offset + limit })
    }
  };

  retrieveMoreProducts({ newOffset, category }) {
    const { location } = this.props.state
    const { productsLimit, products } = this.state;
    const ExistingData = products.find(product => product.category === category)

    const parameter = {
      condition: [{ 
        column: 'category',
        clause: '=',
        value: category
      }],
      latitude: location.latitude,
      longitude: location.longitude,
      limit: productsLimit,
      offset: newOffset,
    }

    this.setState({ isFetchingMoreProduct: true, isError: false })
    Api.request(Routes.dashboardRetrieveCategoryProducts, parameter, response => {
      if (response.data.length > 0 && response.data[0].length > 0) {
        const newProducts = [...response.data[0]]
        const joinedProducts = _.uniqBy([...ExistingData.data, ...newProducts ], 'id')
        const categoryIndex = _.findIndex(products, (data) => data.category === category);
        
        const updatedData = [...products]
        updatedData[categoryIndex].data = joinedProducts

        this.setState({
          isLoading: false,
          isFetchingMoreProduct: false,
          products: updatedData,
          productsOffset: newOffset
        })
      } else {
        this.setState({ isLoading: false, isFetchingMoreProduct: false })
      }
    }, (error) => {
      console.log({ errorViewMoreProducts: error })
      this.setState({
        isLoading: false,
        isError: true,
      })
    })
  }

  onPullRefreshProducts = ({ contentOffset }) => {
    const { productsOffset, selected_category, isLoading } = this.state
    if (contentOffset.y < -30 && !isLoading) {
      this.retrieveMoreProducts({ newOffset: productsOffset, category: selected_category })
    }
  }

  isOnBottomProducts = ({layoutMeasurement, contentOffset, contentSize}) => {
    const { productsOffset, productsLimit, selected_category, isLoading, isFetchingMoreProduct } = this.state
    const shouldFetchData = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (shouldFetchData && !isLoading && !isFetchingMoreProduct) {
      this.retrieveMoreProducts({ newOffset: productsOffset + productsLimit, category: selected_category })
    }
  };

  viewMoreProducts = (category, theme = null) => {
    const { navigate } = this.props.navigation
    const _category = this.state.products.find(product => product.category === category)
    if (_category.data.length) {
      return (
        _category.data.map((details, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigate('Merchant', { merchant_id: details.merchant_id })}
          >
          <MainCard details={details} theme={theme} />
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
    const { isLoading, isError, products, selected_category } = this.state
    const { navigate } = this.props.navigation
    const { theme } = this.props.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? <Spinner mode="full" /> : null}
        {
          isError && 
          <Text style={{ textAlign: 'center', marginTop: 80, marginBottom: 40, fontSize: 12, color: Color.darkGray }}>
            There is a problem in fetching data. Please try again
          </Text>
        }
        {
          selected_category
          ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={100}
                onScroll={({ nativeEvent }) => {
                  this.isOnBottomProducts(nativeEvent)
                }}
                onScrollEndDrag={({ nativeEvent }) => {
                  this.onPullRefreshProducts(nativeEvent)
                }}
              >
                <View
                  style={[
                    Style.MainContainer,
                    {
                      minHeight: height,
                      paddingBottom: 150
                    },
                  ]}
                >
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
                        {selected_category}
                      </Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                      {
                        this.viewMoreProducts(selected_category, theme)
                      }
                    </View>
                  </View>
                </View>
              </ScrollView>
            )
          : (
              <ScrollView
                ref={ref => this.ScrollViewRef = ref}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={100}
                onScrollEndDrag={({ nativeEvent }) => {
                  this.onPullRefreshCategories(nativeEvent)
                  this.isOnBottomCategories(nativeEvent)
                }}
              >
                <View
                  style={[
                    Style.MainContainer,
                    {
                      minHeight: height,
                      paddingBottom: 150
                    },
                  ]}
                >
                {
                  products.length > 0 && products.map((product, idx) => (
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
                                  product.data.map((details, idx) => {
                                    return (
                                      <TouchableOpacity
                                        key={idx}
                                        onPress={() => navigate('Merchant', { merchant_id: details.merchant_id })}
                                      >
                                        <Card details={details} theme={theme}/>
                                      </TouchableOpacity>
                                    )
                                  })
                                }
                              </ScrollView>
                            </View>
                          )
                        : (
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 100}}>
                              <Text>No products available in your area</Text>
                            </View>
                          )
                      }
                    </View>
                  )) //end products map
                }
                </View>
              </ScrollView>
            )
        }
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
