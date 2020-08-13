import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ColorPropType,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import {  Color } from 'common';
import Style from './Style.js';
import { Spinner } from 'components';
import { Routes } from 'common';
import Api from 'services/api/index.js'
import { MainCard, Feature, MainFeature, PromoCard } from 'components/ProductThumbnail'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter,faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// TEST DATA USER LOC. & PROMO
import { promo, UserLocation } from './data-test';
let collectedFilters=['Filipino','City Choices'];
class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      data: null,
      searchString:'',
      featured: []
    };
  }

  componentDidMount() {
    this.retrieve()
  }

  retrieve = () => {
    const featured_products_parameter = {
      latitude: UserLocation.latitude,
      longitude: UserLocation.longitude
    }
    this.setState({ isLoading: true, isError: false })
    Api.request(Routes.dashboardRetrieveFeaturedProducts, featured_products_parameter, response => {
      console.log({ responseFeaturedProducts: response })
      if (response.data.length) {
        this.setState({
          isLoading: false,
          featured: response.data[0]
        })        
      } else {
        this.setState({
          isLoading: false,
          featured: []
        })        
      }   
    }, (error) => {
      console.log({ errorFeaturedProducts: error })
      this.setState({
        isLoading: false,
        isError: true
      })
    })
  }

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
        return product.tags.includes(tag)})
      }
    )

    return(filtered)
  }

  render() {
    const { isLoading, data, featured, isError } = this.state;
    const { theme } = this.props.state
    const { navigate } = this.props.navigation

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? <Spinner mode="full" /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={100}
          onScroll={(event) => {
            console.log({ y: event.nativeEvent.contentOffset.y })
            if (event.nativeEvent.contentOffset.y < -30) {
              if (isLoading == false) {
                this.setState({ isLoading: true })
              }
            }
          }}
          onScrollEndDrag={(event) => {
            if (event.nativeEvent.contentOffset.y < -30) {
              this.retrieve()
            } else {
              this.setState({ isLoading: false })
            }
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
            <View style={{ marginVertical: 10 }}>
              <PromoCard details={promo} theme={theme} />
            </View>

            {/* Filter */}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Featured);
