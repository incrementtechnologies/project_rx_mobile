import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'components';
import Api from 'services/api';
import { Routes, Helper, BasicStyles, Color } from 'common';
import Style from './Style'

class Referral extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      referrals: null,
      email: '',
      emailMessage: ''
    }
  }

  componentDidMount() {
    this.retrieve()
    this.setState({ emailMessage: Helper.referral.emailMessage })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.state.user !== this.props.state.user) {
      this.retrieve()
    }
  }

  retrieve = () => {
    const { user } = this.props.state;
    if(user === null) return

    this.setState({ isLoading: true })
    const parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }],
      sort: {
        created_at: 'desc'
      }
    }
    Api.request(Routes.invitationRetrieve, parameter, response => {
      const data = []
      if (response.data.length) {
        response.data.map(val => data.push([val.address, val.status]))
        this.setState({
          isLoading: false,
          referrals: data
        })
      } else {
        this.setState({ isLoading: false })
      }
    }, error => {
      console.log({ error })
      this.setState({isLoading: false})
    })
  }

  sendInvitation() {
    const { user } = this.props.state
    
    if (user === null) {
      const proceedToLogin = NavigationActions.navigate({
        routeName: 'loginStack'
      });
      this.props.navigation.dispatch(proceedToLogin)

      Alert.alert('You must first log in before sending invitation')
      return
    }

    const email = this.state.email.trim()
    const emailMessage = this.state.emailMessage.trim()

    if (this.state.email.trim() === '' || Helper.validateEmail(email) === false) {
      Alert.alert('Invalid email address')
      return
    }
    if (this.state.emailMessage.trim() === '') {
      Alert.alert('Message is required')
      return
    }

    this.setState({isLoading: true})
    const parameter = {
      account_id: user.id,
      to_email: email,
      content: emailMessage,
    }
    Api.request(Routes.invitationCreate, parameter, response => {
      if (response.data) {
        this.retrieve()
      } else {
        if (response.error.length) {
          Alert.alert(response.error)
        }
        this.setState({isLoading: false})  
      }
    }, error => {
      console.log({ error })
      this.setState({isLoading: false})
    })
  }

  render() {
    const { isLoading } = this.state;
    const { user, theme } = this.props.state;
    return (
      <>
      { isLoading ? <Spinner mode="overlay"/> : null }
      <ScrollView style={Style.ScrollView} showsVerticalScrollIndicator={false}>
        <View style={Style.MainContainer}>
          <View style={[Style.header, { backgroundColor: theme ? theme.primary : Color.primary }]}>
            <Text style={{ color: Color.white }}>Invite Friends to { Helper.APP_NAME_BASIC }</Text>
          </View>
          <View style={[Style.referralMessage, { backgroundColor: theme ? theme.primary : Color.primary }]}>
            <Text style={{ color: Color.white, padding: 5, textAlign: 'justify' }}>
              { Helper.referral.message }
            </Text>
          </View>
          <View style={{ width: '90%', margin: 10 }}>
            <View style={Style.inputContainer}>
                <TextInput
                  style={{ height: 40 }}
                  underlineColorAndroid='transparent'
                  placeholderTextColor='gray'
                  placeholder='Type email address here...'
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                />
            </View>
            <View style={Style.inputContainer}>
              <TextInput
                style={{ height: 150, justifyContent: 'flex-start', textAlignVertical: 'top' }}
                placeholder='Type your message here...'
                placeholderTextColor='gray'
                underlineColorAndroid='transparent'
                numberOfLines={10}
                multiline={true}
                onChangeText={(emailMessage) => this.setState({ emailMessage })}
                value={this.state.emailMessage}
              />
            </View>
            <View
              style={[
                Style.inputContainer,
                {
                  backgroundColor: isLoading ? Color.gray : theme ? theme.primary : Color.primary,
                  height: 50,
                  justifyContent: 'center'
                }
              ]}
            >
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => this.sendInvitation()}
              >
                <Text style={{ color: Color.white, textAlign: 'center', fontSize: 17 }}>Send Invitation</Text>
              </TouchableOpacity>
            </View>
            <View style={[Style.inputContainer, { padding: 0 }]}>
              {
                this.state.referrals && user !== null ? (
                  <View>
                    <Table>
                      <Row
                        flexArr={[2, 1]}
                        data={['Email', 'Rewards']}
                        style={{ height: 40, backgroundColor: theme ? theme.primary : Color.primary }}
                        textStyle={{ margin: 10, color: Color.white }}
                      />
                      <Rows
                        flexArr={[2, 1]}
                        data={this.state.referrals}
                        textStyle={{ margin: 10 }}
                      />
                    </Table>
                  </View>
                ) : (
                  <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <FontAwesomeIcon
                        icon={faHourglassStart}
                        size={40}
                        style={{
                          color: Color.danger
                        }}
                      />
                      <Text style={{ color: Color.danger, fontWeight: '600' }}>
                        Looks like you do not have referrals!
                      </Text>
                    </View>
                    <View>
                      <Text style={{ textAlign: 'center' }}>
                        Invite your friends now!
                      </Text>
                    </View>
                  </View>
                )
              }
            </View>
          </View>
        </View>
      </ScrollView>
      </>
    )
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
)(Referral);