import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faTimesCircle, faMinusCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'components';
import CreateRating from './CreateRating';
import ViewItems from './OrderItems';
import Api from 'services/api';
import Currency from 'services/Currency'
import { Routes, Helper, BasicStyles, Color } from 'common';
import Style from './Style';

const CompletedIcon = () => <FontAwesomeIcon icon={faCheckCircle} size={15} style={{ color: Color.success}} />
const PendingIcon = () => <FontAwesomeIcon icon={faMinusCircle} size={15} style={{ color: Color.warning}} />
const CancelledIcon = () => <FontAwesomeIcon icon={faTimesCircle} size={15} style={{ color: Color.danger}} />
const DefaultIcon = () => <FontAwesomeIcon icon={faExclamationCircle} size={15} style={{ color: Color.darkGray}} />

class MyOrderDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      details: null,
      createRating: {
        state: false,
        selected: null
      },
      viewItems: false
    }
  }

  componentDidMount() {
    const checkoutId = this.props.navigation?.state?.params?.checkoutId || null

    this.setState({ isLoading: true })
    if (checkoutId != null) {
      this.retriveSpecificOrder(checkoutId)
    } else {
      const details = this.props.navigation.state?.params?.data
      this.setState({ details, isLoading: false })
    }
  }

  retriveSpecificOrder = (checkoutId) => {
    const parameter = {
      condition: [{
        column: 'id',
        clause: '=',
        value: checkoutId
      }],
    }

    Api.request(Routes.ordersRetrieve, parameter, response => {
      if (response.data.length) {
        this.setState({ isLoading: false, details: response.data[0] })
      } else {
        this.setState({ isLoading: false })
      }
    }, error => {
      console.error({ RetrievingOrdersError: error })
      this.setState({ isLoading: false })
    })
  }

  goToMessenger(details) {
    this.props.navigation.navigate('MessengerMessages', { 
      checkoutData: {
        id: details.id,
        code: details.code,
        merchantId: details.merchant_id
      },
      messengerHeaderTitle: `***${details.code.slice(-8)}`
    });
  }

  render() {
    const { theme } = this.props.state
    const { isLoading, createRating, viewItems } = this.state
    const { details } = this.state

    if (isLoading) {
      return (
        <View style={{ marginVertical: 20 }}>
          <Spinner mode="full"/> 
        </View>
      )
    }

    if (details == null && !isLoading) return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20
        }}
      >
        <Text>
          Error fetching data, please try again
        </Text>
      </View>
    )

    let icon = null
    switch (details.status) {
      case 'completed':
        icon = <CompletedIcon />
        break
      case 'pending':
        icon = <PendingIcon />
        break
      case 'cancelled':
        icon = <CancelledIcon />
        break
      default:
        icon = <DefaultIcon />
        break
    }
    return (
      <ScrollView style={Style.ScrollView} showsVerticalScrollIndicator={false}>
        <CreateRating
          visible={createRating}
          title="Give feedback"
          data={details}
          close={() => this.setState({ createRating: { ...createRating, state: false } })}
        />
        <ViewItems
          visible={viewItems}
          data={details}
          setVisible={() => this.setState({ viewItems: false })}
        />
        <View style={Style.myOrderDetailsContainer}>
          <View style={[Style.header, { backgroundColor: theme ? theme.primary : Color.primary }]}>
            <Text style={Style.textWhite}>
              Order Details
            </Text>
          </View>
          <View style={Style.orderDetails}>
            <View style={Style.detailRow}>
              <View style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: '600', fontSize: 12 }}>
                    Date: {' '}
                  </Text>
                  <Text style={{ fontWeight: 'normal', fontSize: 12 }}>
                    {details.date}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Style.detailRow}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: '600' }}>
                    Status:
                  </Text>
                  <View style={{ marginHorizontal: 3}}>
                    {icon}
                  </View>
                  <Text style={{ fontWeight: 'normal', textTransform: 'uppercase' }}>
                    {details.status}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Style.detailRow}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontWeight: '600' }}>
                  Order Number: {' '}
                </Text>
                <Text>
                  {details.order_number}
                </Text>
              </View>
            </View>
            <View style={Style.detailRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '600' }}>
                  Type: {' '}
                </Text>
                <Text style={{ textTransform: 'uppercase' }}>
                  {details.type}
                </Text>
              </View>
            </View>
            <View style={Style.detailRow}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontWeight: '600', marginBottom: 2 }}>
                  Delivery to: {' '}
                </Text>
                <Text>
                  {details.location}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: Color.darkGray, fontStyle: 'italic' }}>
                (Location based from merchant)
              </Text>
            </View>
            <View style={Style.detailRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '600' }}>
                  Recipient: {' '}
                </Text>
                <Text>
                  {details.name}
                </Text>
              </View>
            </View>
            <View style={Style.detailRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '600' }}>
                  Rider: {' '}
                </Text>
                {
                  details.assigned_rider ? (
                    <Text style={{ color: Color.success }}>
                      {details.assigned_rider.name}
                    </Text>
                  ) : (
                    <Text style={{ color: Color.warning }}>
                      No rider yet
                    </Text>
                  )
                }
              </View>
            </View>
            <View style={
              [Style.detailRow,
              { 
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: Color.gray,
                paddingVertical: 10
              }]
            }>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Payment Status: {' '}
                </Text>
                <Text>
                  {details.payment_status}
                </Text>
              </View>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Coupon: {' '}
                </Text>
                <Text>
                  {details.coupon || 'None'}
                </Text>
              </View>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Sub total: {' '}
                </Text>
                <Text>
                  {Currency.display(+details.sub_total, 'PHP')}
                </Text>
              </View>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Tax: {' '}
                </Text>
                <Text>
                  {Currency.display(+details.tax, 'PHP')}
                </Text>
              </View>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Shipping fee: {' '}
                </Text>
                <Text>
                  {Currency.display(+details.shipping_fee, 'PHP')}
                </Text>
              </View>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Total: {' '}
                </Text>
                <Text>
                  {Currency.display(+details.total, 'PHP')}
                </Text>
              </View>
              <View style={[Style.detailRow, { flexDirection: 'row' }]}>
                <Text style={{ fontWeight: '600' }}>
                  Tendered amount: {' '}
                </Text>
                <Text>
                  {Currency.display(+details.tendered_amount, 'PHP')}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontWeight: '600' }}>
                  Change: {' '}
                </Text>
                <Text>
                  {Currency.display(+details.change, 'PHP')}
                </Text>
              </View>
            </View>
            <View style={Style.detailRow}>
              <TouchableOpacity onPress={() => this.setState({ viewItems: true })}>
                <View style={[
                  Style.detailsButton,
                  { backgroundColor: theme ? theme.primary : Color. primary }
                ]}>
                  <Text style={{
                    textAlign: 'center',
                    color: Color.white,
                  }}>
                    View Items
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('View history')}>
                <View style={[
                  Style.detailsButton,
                  { backgroundColor: theme ? theme.primary : Color. primary }
                ]}>
                  <Text style={{
                    textAlign: 'center',
                    color: Color.white,
                  }}>
                    View History
                  </Text>
                </View>
              </TouchableOpacity>
              {
                details.status !== 'completed' ? (
                  <TouchableOpacity onPress={() => this.goToMessenger(details)}>
                    <View style={[
                      Style.detailsButton,
                      { backgroundColor: theme ? theme.primary : Color. primary }
                    ]}>
                      <Text style={{
                        textAlign: 'center',
                        color: Color.white,
                      }}>
                        Messenger
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity onPress={() => this.setState({ createRating: { state: true, selected: 'Merchant' } })}>
                      <View style={[
                        Style.detailsButton,
                        { backgroundColor: theme ? theme.primary : Color. primary }
                      ]}>
                        <Text style={{
                          textAlign: 'center',
                          color: Color.white,
                        }}>
                          Rate Merchant
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ createRating: { state: true, selected: 'Rider' } })}>
                      <View style={[
                        Style.detailsButton,
                        { backgroundColor: theme ? theme.primary : Color. primary }
                      ]}>
                        <Text style={{
                          textAlign: 'center',
                          color: Color.white,
                        }}>
                          Rate Rider
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )
              }
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setMessengerGroup: (messengerGroup) => dispatch(actions.setMessengerGroup(messengerGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyOrderDetails);