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
import _ from 'lodash';
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
      isEnd: false,
      isFetchingMore: false,
      data: [],
      limit: 5,
      offset: 0,
      sort: 'name'
    };
  }

  componentDidMount() {
    this.retrieve({ offset: this.state.offset })
  }

  retrieve = ({ offset, fetchMore = false }) => {
    const { limit } = this.state
    if (!fetchMore) {
      this.setState({
        isLoading: true,
        isError: false
      })
    } else {
      this.setState({ isFetchingMore: true })
    }

    const parameter = {
      limit: limit,
      offset: offset,
      sort: this.state.sort,
      latitude: UserLocation.latitude,
      longitude: UserLocation.longitude
    }

    Api.request(Routes.dashboardRetrieveShops, parameter, response => {
      if (response.data.length > 0 && response.data[0].length > 0 ) {
        const joined = _.uniqBy([...this.state.data, ...response.data[0]], 'id');
        this.setState({
          isLoading: false,
          data: joined,
          offset,
          isFetchingMore: false
        })
      } else {
        this.setState({
          isLoading: false,
          isEnd: true,
          isFetchingMore: false
        })
      }
    }, (error) => {
      console.log({ errorShops: error })
      this.setState({
        isLoading: false,
        isError: true,
        isFetchingMore: false
      })
    });
  }

  onPullRefresh = ({ contentOffset }) => {
    const { offset, isLoading } = this.state
    if (contentOffset.y < -30 && !isLoading) {
      this.retrieve({ offset })
    }
  }

  isOnBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const { offset, limit, isLoading, isFetchingMore, isEnd } = this.state
    const paddingToBottom = -10;
    const shouldFetchData = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    if (shouldFetchData && !isLoading && !isFetchingMore && !isEnd) {
      this.retrieve({ offset: offset + limit, fetchMore: true })
    }
  };

  render() {
    const { isLoading, isError, data, isEnd } = this.state;
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? <Spinner mode="full" /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={100}
          onScroll={({ nativeEvent }) => {
            this.isOnBottom(nativeEvent)
          }}
          onScrollEndDrag={({ nativeEvent }) => {
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
              isEnd && 
              <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 12, color: Color.darkGray }}>
                Cannot find any more shops
              </Text>
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
