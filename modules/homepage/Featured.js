import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {  Color } from 'common';
import Style from './Style.js';
import { Spinner } from 'components';
import { Routes } from 'common';
import Api from 'services/api/index.js'
import { MainCard, Feature, MainFeature, PromoCard } from 'components/ProductThumbnail'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import GetDeviceLocation from './getDeviceLocation';

class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingCoupons: false,
      isError: false,
      data: null,
      coupons: [],
      searchString:'',
      featured: [],
      limit: 10,
      offset: 0,
      number:1,
      monitor:null,
    };
  }

  componentDidMount() {
    const { location } = this.props.state
    console.log(location)
    
    if (location) {
      this.retrieve({ offset: this.state.offset, changedAddress: location })
    }
    console.log(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentLoc = this.props.state.location
    const nextLoc = nextProps.state.location
    const isEqual = _.isEqual(currentLoc, nextLoc)

    if (!isEqual) {
      this.setState({ featured: [], offset: 0 })
      this.retrieve({ offset: 0, changedAddress: nextLoc })
    }
  }

  retrieve = async ({ offset, fetchMore = false, changedAddress = null }) => {
    const { limit } = this.state

    const latitude = changedAddress.latitude
    const longitude = changedAddress.longitude

    const featured_products_parameter = {
      latitude,
      longitude,
      limit,
      offset,
    }

    if (!fetchMore) {
      this.setState({ isLoading: true, isLoadingCoupons: true, isError: false })
    }
    Api.request(Routes.dashboardRetrieveFeaturedProducts, featured_products_parameter, response => {
      if (response.data.length > 0 && response.data[0].length > 0) {
        const joined = _.uniqBy([...this.state.featured, ...response.data[0]], 'id')
        this.setState({
          isLoading: false,
          featured: joined,
          offset
        })        
      } else {
        this.setState({ isLoading: false })        
      }   
    }, (error) => {
      console.log({ errorFeaturedProducts: error })
      this.setState({
        isLoading: false,
        isError: true
      })
    })

    Api.request(Routes.couponsRetrieve, {}, (response) => {
      if (response.data.length) {
        this.setState({ coupons: response.data, isLoadingCoupons: false })
      } else {
        this.setState({ isLoadingCoupons: false })
      }
    }, (error) => {
      console.log({ couponsErr: error })
      this.setState({ isLoadingCoupons: false })
    })
  }

  onPullRefresh = ({ contentOffset }) => {
    const { offset, isLoading } = this.state
    if (contentOffset.y < -30 && !isLoading) {
      this.retrieve({ offset })
    }
  }

  isOnBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const { offset, limit, isLoading } = this.state
    const shouldFetchData = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (shouldFetchData && !isLoading) {
      this.retrieve({ offset: offset + limit, fetchMore: true })
    }
  };

  redirect = route => {
    this.props.navigation.navigate(route);
  };

  filterRedirect = () => {
    this.redirect('filterPicker')
  }

  searchedString = (list) => {
    const getValue = value => (typeof value === 'string' ? value.toLowerCase() : value);
    const filteredProducts=this.filterSearch(list,this.props.state.productFilter);

    return filteredProducts.filter(filteredProducts=>getValue(filteredProducts.title).includes(this.state.searchString.toLowerCase())  )
  }

  filterSearch = (products,filters) => {
    const getValue = value => (typeof value === 'string' ? value.toLowerCase() : value);

    let filtered = products.filter( product => {
      if (filters.length==0) {
        return true
      }
      return filters.some(tag => {
        return product.category.includes(tag)})
      }
    )

    return(filtered)
  }

  changeAddress = () => {
    const { user } = this.props.state
    const { navigate } = this.props.navigation

    if (!user) {
      navigate('loginStack')
      return
    }

    navigate('ChangeAddress')
  }

  render() {
    const {
      isLoading,
      isLoadingCoupons,
      coupons,
      featured,
      isError,
    } = this.state;
    const { theme } = this.props.state
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? <Spinner mode="full" /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={100}
          onScrollEndDrag={({ nativeEvent }) => {
            this.isOnBottom(nativeEvent)
            this.onPullRefresh(nativeEvent)
          }}
        >
          <View
            style={[
              Style.MainContainer,
              {
                minHeight: height,
                paddingBottom: 150
              },
            ]}>
            {/* Main Feature Product */}
            {/* <TouchableOpacity onPress={() => navigate('Merchant', mainFeaturedProduct)}>
              <MainFeature details={mainFeaturedProduct} />
            </TouchableOpacity> */}

            {/* Scrollable Features */}
            {/* <View style={{ height: 150, marginBottom: 10 }}>
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
            </View> */}

            {/* Divider */}
            {/* <View 
              style={{ 
                borderBottomColor: 'rgba(0,0,0,0.1)',
                borderBottomWidth: 2,
                marginVertical: 5
              }}
            /> */}

            {/* Promo Card */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                minHeight: 70,
                maxHeight: 200,
                marginBottom: 20
              }}
            >
              {
                isLoadingCoupons ? (
                  [1, 2, 3, 4, 5].map((id) => (
                    <View key={id} style={{ marginRight: 10, marginVertical: 10 }}>
                      <PromoCard theme={theme} skeleton={true} />
                    </View>
                  ))
                ) : (
                  coupons.length > 0 && coupons.map((coupon) => (
                    <View key={coupon.id} style={{ marginRight: 10, marginVertical: 10 }}>
                      <PromoCard details={coupon} theme={theme} />
                    </View>
                  ))
                )
              }
            </ScrollView>

            {
              featured.length > 0 ? (
                <>
                  <View style={{ alignItems: 'center' }}>
                    <View 
                      style={{
                        width: '98%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        // box-shadow
                        backgroundColor: Color.white,
                        borderRadius: 5,
                        borderColor: '#ddd',
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 2,
                      }}
                    >
                      <View style={{padding:14,width:'15%'}}>
                        <FontAwesomeIcon style={Style.searchIcon} size={23} icon={faSearch} color={Color.primary}/>
                      </View>
                      <TextInput
                        style={{width:'70%'}}
                        placeholder="Search for Shops"
                        onChangeText={(searchString) => {this.setState({searchString})}}
                      />
                      <TouchableOpacity style={{padding:14,width:'15%'}} onPress={()=>this.filterRedirect()}>
                        <FontAwesomeIcon style={Style.searchIcon} size={23} icon={faFilter} color={Color.primary}/>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    {/* width: 98% !important */}
                    <View style={{ width: '98%' }}>
                      {
                        featured.length > 0 && this.searchedString(featured).map((product) => {
                          return (
                            <TouchableOpacity
                              key={product.id}
                              onPress={() => navigate('Merchant', product)}
                            >
                              <MainCard key={product.id} details={product} theme={theme} />
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                  </View>
                </>
              ) : isLoading === false ? (
                <View style={{ alignItems: 'center' }}>
                  <Text>
                    Looks like there are no featured products available in your area. {''}
                    <Text
                      onPress={() => this.changeAddress()}
                      style={{ color: Color.primary, fontWeight: 'bold' }}
                    >
                      You can set your location here!
                    </Text>
                  </Text>
                </View>
              ) : null
            }

            {
              isError && 
              <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 12, color: Color.darkGray }}>
                There is a problem in fetching data. Please try again
              </Text>
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
  return {
    setLocation: (location) => dispatch(actions.setLocation(location)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Featured);
