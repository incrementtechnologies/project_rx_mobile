import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import Api from 'services/api/index.js';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification ,GooglePlacesAutoComplete} from 'components';
import Geolocation from '@react-native-community/geolocation';
import AddressCard from 'modules/checkoutChangeAddress/addressCard.js'
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import {dataAddress} from './data'


class ChangeAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
     showInput:false,
     data:[],
     returnedAddress:{},
     selected: null
    }   
  }
  

  componentDidMount(){
    const { user } = this.props.state;
      this.retrieve()
      console.log("mount")
      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.retrieve()
          console.log("remount")
        }
      );
  }

  componentWillUnmount(){
    this.willFocusSubscription.remove()
  }
  retrieve = () => {
    const { user } = this.props.state;
  
    const parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '=',
      }],
      sort: {
        'created_at': 'desc'
      }
    }
    this.setState({
      isLoading: true
    })
    Api.request(Routes.locationRetrieve, parameter, response => {
      this.setState({isLoading: false})
      if(response.data.length > 0){
        const { setLocation } = this.props;
        const { location } = this.props.state;
        this.setState({data: response.data})
        if(location == null){
          setLocation(response.data[0])
        }
      }
    },error => {
      console.log(error)
    });
  }
  

  FlatListItemSeparator = () => {
    return (
      <View style={BasicStyles.Separator}/>
    );
  };

  goTo = () => {
    this.props.navigation.navigate('addressMap')
  }

  changeAddress = (index) => {
    let addresses=this.state.data;
    const pickedLocation=addresses.find(address => {
      return address.id===index
    })
    console.log(pickedLocation)
    this.setState({value:index})
    this.props.setLocation(pickedLocation)
    this.props.navigation.pop()
  }

  setLocation = (item) => {
    const { setLocation } = this.props;
    setLocation(item)
  }

  showAddresses =() => {
    let addresses = this.state.data
    return(
      <View>
      {addresses.map((address,index)=>(<AddressCard index={index} current={this.state.value} keys={address.id} details={address} pickAddress={()=>{this.changeAddress(address.id)}} />))}
        </View>
    )
  }

  render() {
    const {isLoading, data, selected} = this.state;
    const { user, location, theme } = this.props.state;
    return (
      <View style={{flex:1}}>
      <ScrollView 
        style={Style.ScrollView}>
        <View style={[Style.MainContainer, {
          minHeight: height
        }]}>
          {
            data && (
              <FlatList
                data={data}
                extraData={selected}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableHighlight
                      onPress={() => {this.setLocation(item, index)}}
                      underlayColor={Color.gray}
                      >
                      <View style={[Style.TextContainer, {
                        backgroundColor: location && location.id === item.id? Color.primary : Color.white
                      }]}>
                        <Text
                          style={[BasicStyles.normalText, {
                            color: location && location.id === item.id? Color.white : Color.black,
                            fontWeight: 'bold',
                            paddingTop: 15
                          }]}>
                          {item.route}
                        </Text>

                        <Text
                          style={[BasicStyles.normalText, {
                            paddingBottom: 15,
                            color: location && location.id === item.id? Color.white : Color.black
                          }]}>
                          {item.locality + ', ' + item.country}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )
          }
        </View>
      </ScrollView>
      <View style={{
        position: 'absolute',
        bottom: 5,
        alignSelf: 'flex-end',
        right: 5
      }}>
        <TouchableOpacity onPress={()=>this.goTo()}>
           <View style={[Style.circleButton, {
            backgroundColor: theme ? theme.primary : Color.primary
           }]}>
           <View style={{alignItems:'center'}}>
                    <FontAwesomeIcon size={25}icon={faPlus} color={'white'}/>
           </View>
           </View>
        </TouchableOpacity>
     </View>
      </View>
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
)(ChangeAddress);
