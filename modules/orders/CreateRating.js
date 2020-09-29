import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Picker, Image, Alert} from 'react-native';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faStar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { Color , BasicStyles, Helper, Routes} from 'common';
import { Spinner } from 'components';
import Api from 'services/api/index.js';
import Config from 'src/config.js';
import styles from './CreateRatingStyle';

class CreateRating extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      isErrorMerchant: false,
      isErrorRider: false,
      rating: 1,
      comments: null,
      merchantData: null,
      riderData: null,
      merchantRating: null,
      riderRating: null
    }
  }

  submit = () => {
    const { user } = this.props.state
    const selected = this.props.visible.selected
    const details = this.props.data
    
    let payload, payload_value = null
    if (selected === 'Merchant') {
      payload = 'merchant'
      payload_value = details.merchant_id
    }
    if (selected === 'Rider') {
      payload = 'rider'
      payload_value = details.assigned_rider.id
    }

    const parameter = {
      account_id: user.id,
      payload,
      payload_value,
      value: this.state.rating,
      payload_1: 'checkout',
      payload_value_1: details.id,
      status: 'all',
      comments: this.state.comments || null
    }

    this.setState({ isLoading: true });
    Api.request(Routes.ratingsCreate, parameter, response => {
      if (response.data) {
        this.retrieveRating(payload)
      }
      this.setState({ isLoading: false })
    }, error => {
      this.setState({ isLoading: false })
      console.log({ submitRatingError: error })
    });
  }

  close = () => {
    this.props.close()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible.selected !== this.props.visible.selected) {
      this.setState({ comments: null, rating: 1 })
      if (
        this.props.visible.selected === 'Merchant' &&
        this.state.merchantData === null &&
        this.state.merchantRating === null &&
        this.props.visible.state
      ) {
        this.retrieveRating('merchant')
      }
      else if (
        this.props.visible.selected === 'Rider' &&
        this.state.riderData === null &&
        this.state.riderRating === null &&
        this.props.visible.state
      ) {
        this.retrieveRating('rider')
      }
    }
  }

  retrieveRating = (selected) => {
    const { user } = this.props.state
    const details = this.props.data

    const ratingRetrieveParameter = {
      account_id: user.id,
      condition: [{
        column: 'payload',
        clause: '=',
        value: selected
      }, {
        column: 'payload_value',
        clause: '=',
        value: selected === 'merchant' ? details.merchant_id : details.assigned_rider.id
      }, {
        column: 'payload_1',
        clause: '=',
        value: 'checkout'
      }, {
        column: 'payload_value_1',
        clause: '=',
        value: details.id
      }]
    }

    if (selected === 'merchant') {
      this.setState({ isErrorMerchant: false, isLoading: true })
      Api.request(Routes.ratingsRetrieve, ratingRetrieveParameter, response => {
        if (response.data.length && response.status) {
          this.setState({ merchantRating: response.data[0], isLoading: false })
        } else {
          this.setState({ merchantRating: null })
          this.retrieveInfo('merchant')
        }
      });
    } else if (selected === 'rider') {  
      this.setState({ isErrorMerchant: false, isLoading: true })
      Api.request(Routes.ratingsRetrieve, ratingRetrieveParameter, response => {
        if (response.data.length && response.status) {
          this.setState({ riderRating: response.data[0], isLoading: false })
        } else {
          this.setState({ riderRating: null })
          this.retrieveInfo('rider')
        }
      });
    }
  }

  retrieveInfo = (selected) => {
    if (selected === 'merchant') {
      const merchantParameter = {
        condition: [{
          column: 'id',
          clause: '=',
          value: this.props.data.merchant_id
        }]
      }
      this.setState({ isErrorMerchant: false, isLoading: true })
      Api.request(Routes.merchantRetrieve, merchantParameter, response => {
        if (response.data.length) {
          this.setState({ merchantData: response.data[0], isLoading: false })
        } else {
          this.setState({ merchantData: null, isLoading: false })
        }
      }, (error) => {
        console.log({ retrieveMerchantInfoError: error })
        this.setState({
          isLoading: false,
          isErrorMerchant: true,
          merchantData: null
        })
      });
    }
    else if (selected === 'rider') {
      this.setState({ isLoading: true })
      setTimeout(() => {
        this.setState({
          riderData: {
            id: this.props.data.assigned_rider.id,
            name: this.props.data.assigned_rider.name,
            logo: null
          },
          isLoading: false
        })
      }, 500)
    }
  }


  _ratings = (selected) => {
    const { merchantData, riderData } = this.state;

    let stars = []
    for(let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => this.setState({ rating: i })}>
          <FontAwesomeIcon
          icon={ i <= this.state.rating ? faStar : faStarRegular}
          size={50}
          style={{
            color: Color.warning
          }}
          key={i}
          />
        </TouchableOpacity>
      )
    }
    
    let profile = null
    let name = null
    if (selected === 'Merchant') {
      if (merchantData) {
        name = merchantData.name
      }
      if (merchantData && merchantData.logo !== null) {
        profile = (
          <Image
            source={{ uri: Config.BACKEND_URL  + merchantData.logo }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50
            }}
          />
        )
      } else {
        profile = (
          <FontAwesomeIcon
            icon={faUserCircle}
            size={100}
            style={{
              color: Color.primary
            }}
          />
        )
      }
    } else if (selected === 'Rider') {
      if (riderData) {
        name = riderData.name
      }
      if (riderData && riderData.logo !== null) {
        profile = (
          <Image
            source={{ uri: Config.BACKEND_URL  + riderData.logo }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50
            }}
          />
        )
      } else {
        profile = (
          <FontAwesomeIcon
            icon={faUserCircle}
            size={100}
            style={{
              color: Color.primary
            }}
          />
        )
      }
    }
    return (
      <View>
        <View style={{
          alignItems: 'center',
          marginTop: 20
        }}>
        { profile }
        <Text style={{
            lineHeight: 30,
            paddingLeft: 10,
            fontWeight: 'bold',
            color: Color.primary
        }}>
          { name }
        </Text>
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          flexDirection: 'row' 
        }}>
          {
            stars
          }
        </View>
        <View style={{
          marginLeft: 5,
          marginRight: 5,
          padding: 10
        }}>
          <Text style={{
            paddingTop: 20,
            paddingBottom: 20,
          }}>
            Comments
          </Text>
          <TextInput
            style={{
              borderColor: Color.gray,
              borderWidth: 1,
              width: '100%',
              marginBottom: 20,
              borderRadius: 5,
              textAlignVertical: 'top',
              padding: 5,
              minHeight: 100
            }}
            onChangeText={(comments) => this.setState({comments})}
            value={this.state.comments}
            placeholder={'Type your comment/s here...'}
            multiline = {true}
            numberOfLines = {10}
          />
        </View>
      </View>
    );
  }

  _thankMessage = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        size={100}
        style={{
          color: Color.success,
          marginBottom: 5
        }}
      />
      <Text>
        Thank you for giving a feedback!
      </Text>
    </View>
  )

  _footer = () => {
    const { merchantRating, riderRating } = this.state
    return (
      <View style={[styles.action, {flexDirection: 'row'}]}>
        <View style={{
          width: '100%',
          alignItems: 'center',
          borderLeftColor: Color.gray,
          borderLeftWidth: 1
        }}>
          <TouchableOpacity 
            onPress={() => this.submit()}
            underlayColor={Color.gray}
            >
            <Text style={[styles.text, {
              color: Color.primary
            }]}>
              {
                this.props.visible.selected === 'Merchant' && merchantRating === null ? (
                  `Rate ${this.props.visible.selected}`
                ) : null
              }
              {
                this.props.visible.selected === 'Rider' && riderRating === null ? (
                  `Rate ${this.props.visible.selected}`
                ) : null
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render(){
    const { isLoading, merchantRating, riderRating } = this.state
    return (
      <View>
        <Modal isVisible={this.props.visible.state}>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={{
                  width: '70%'
                }}
                >
                  <Text style={styles.text}>{this.props.title}</Text>
                </View>
                <View style={{
                  width: '30%',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}>
                  <TouchableOpacity onPress={() => this.close()} style={styles.close}>
                    <FontAwesomeIcon icon={ faTimes } style={{
                      color: Color.danger
                    }} size={BasicStyles.iconSize} />
                  </TouchableOpacity>
                </View>
              </View>
              { isLoading ? <Spinner mode="overlay"/> : (
                  <>
                    <View style={styles.content}>
                      {
                        this.props.visible.selected === 'Merchant' && merchantRating === null ? (
                          this._ratings(this.props.visible.selected)
                        ) : (
                          this.props.visible.selected === 'Merchant' && this._thankMessage()
                        )
                      }
                      {
                        this.props.visible.selected === 'Rider' && riderRating === null ? (
                          this._ratings(this.props.visible.selected)
                        ) : (
                          this.props.visible.selected === 'Rider' && this._thankMessage()
                        )
                      }
                    </View>
                    {
                        this.props.visible.selected === 'Merchant' && merchantRating === null ? (
                          this._footer()
                        ) : null
                      }
                      {
                        this.props.visible.selected === 'Rider' && riderRating === null ? (
                          this._footer()
                        ) : null
                      }
                  </>
                )
              }
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setUserLedger: (userLedger) => dispatch(actions.setUserLedger(userLedger))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRating);
