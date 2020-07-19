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
import { Color } from 'common'
import Style from './Style.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR CATEGORIES TAB PRODUCTS
import { products } from './data-test';
const ProductCategories = [
  'Filipino Choices',
  'Asian Choices',
  'Korean Barbeque Choices',
  'Fast Food Choices',
  'Milk Tea Choices'
]

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      selected_category: null
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
            {isLoading ? <Spinner mode="overlay" /> : null}

            {
              this.state.selected_category ?
              (
                <View>
                  <TouchableOpacity onPress={() => this.setState({ selected_category: null })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        size={15}
                        style={{ color: Color.darkGray, marginRight: 5 }}
                      />
                      <Text style={{ color: Color.darkGray, fontSize: 12 }}>
                        Go back
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: '100%', marginVertical: 10, justifySelf: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: '600'}}>
                      {this.state.selected_category}
                    </Text>
                  </View>
                  {
                    products.map(product => (
                      <TouchableOpacity
                        key={product.id}
                        onPress={() => navigate('Merchant', product)}
                      >
                        <MainCard details={product} />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              )
              :
              ProductCategories.map((category, idx) => (
                <View key={idx}>
                  <View style={{ 
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: '600'}}>
                      {category}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      this.setState({ selected_category: category })
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
                  <View style={{ height: 180 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      {
                        products.map(product => (
                          <TouchableOpacity
                            key={product.id}
                            onPress={() => navigate('Merchant', product)}
                          >
                            <Card details={product} />
                          </TouchableOpacity>
                        ))
                      }
                    </ScrollView>
                  </View>
                </View>
            ))}
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
