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

// TEST DATA USER LOC.
import { UserLocation } from './data-test';

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
    this.retrieve()
  }

  retrieve = () => {
    console.log('retrieving...')
    this.setState({ isLoading: true, isError: false })

    Api.request(Routes.dashboardRetrieveCategoryList, {},
    (response) => {
      console.log({ responseCategoryList: response })
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
        console.log({ responseCategoryProducts: response })
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
          isError: true
        })
      })
    },
    (error) => {
      console.log({ errorCategoryList: error })
      this.setState({
        categories: [],
        isLoading: false,
        isError: true
      })
    })
  }

  viewMoreProducts = (category, theme = null) => {
    const { navigate } = this.props.navigation
    const _category = this.state.products.find(product => product.category === category)
    if (_category.data.length) {
      return (
        _category.data.map(details => (
          <TouchableOpacity
            key={details.id}
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
        <ScrollView
          ref={ref => this.ScrollViewRef = ref}
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
            ]}
          >
            {
              selected_category
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
                        {selected_category}
                      </Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                      {
                        this.viewMoreProducts(selected_category, theme)
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
                              <Text>Coming Soon!</Text>
                            </View>
                          )
                      }
                    </View>
                  )) //end products map
                )
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
