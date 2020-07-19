import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import Pagination from 'components/Pagination';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);



class HelpCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main:true,
      myAccount:false,
      accountInfo:false,
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
  }

viewPager=()=>

originalMenu=()=>
{
  return(
  <View>
    <TouchableOpacity onPress={()=>this.setState({...this.state})}>
      <Text>
        My Account
      </Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>
       Making a Payment
      </Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>
        FAQ
      </Text>
    </TouchableOpacity>

  </View>
  )
}

myAccount=()=>
{
  return(
    <View>
        <TouchableOpacity onPress={()=>this.setState({myAccount:false,main:true})}>
      <Text>
       Back
      </Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({myAccount:false,main:false,accountInfo:true})}>
      <Text>
       I Want to Update my Account Information
      </Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>
       I forgot my Password
      </Text>
    </TouchableOpacity>
    </View>
  )
}

accountInfo=()=>
{
  return(
    <View>
      <Text>Hello</Text>
    </View>
  )
}
  render() {
    const { activeIndex } = this.state;
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
      <View>
      
        <PagerProvider activeIndex={activeIndex}>
          <Pager>
          
            <TouchableOpacity
                  onPress={() => alert("Hello")}
            >
              <Text>Featured</Text>
              </TouchableOpacity>
         <Text>Hello</Text>
            <View style={Style.sliderContainer}>
              <Text>Categories</Text>
            </View>
            <View style={Style.sliderContainer}>
              <Text>Shops</Text>
            </View>
            <View style={Style.sliderContainer}>
              <Text>Others</Text>
            </View>
          </Pager>
        </PagerProvider>
      </View>
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
)(HelpCenter);
