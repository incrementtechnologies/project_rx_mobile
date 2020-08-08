import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Style from './Style.js';
import { Spinner } from 'components';
import { ShopThumbnail } from 'components';
import { Routes, Color } from 'common';
import Api from 'services/api/index.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA USER LOC.
import { UserLocation } from './data-test';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      data: null
    };
  }

  componentDidMount() {
    this.retrieve()
  }

  retrieve = () => {
    this.setState({ isLoading: true, isError: false })

    const parameter = {
      limit: 100,
      offset: 0,
      sort: 'name',
      latitude: UserLocation.latitude,
      longitude: UserLocation.longitude
    }
    Api.request(Routes.dashboardRetrieveShops, parameter, response => {
      console.log({ responseShops: response })
      if (response.data.length) {
        this.setState({ isLoading: false, data: response.data[0] })
      }   
    }, (error) => {
      console.log({ errorShops: error })
      this.setState({ isLoading: false, isError: true })
    });
  }

  render() {
    const { isLoading, isError, data } = this.state;
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
            {
              data && data.length > 0 && (
                <View style={{ paddingTop: 10 }}>
                  {
                    data.map((merchant, id) => (
                      <TouchableOpacity key={id} onPress={() => navigate('Merchant', { merchant_id: merchant.id })}>
                        <ShopThumbnail details={merchant} />
                      </TouchableOpacity>
                    ))
                  }
                </View>
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
)(Shops);
