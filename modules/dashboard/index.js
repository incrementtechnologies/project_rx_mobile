import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import Geolocation from '@react-native-community/geolocation';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

// TEST DATA FOR PRODUCTS
import { mainFeaturedProduct, featuredProducts, promo, products } from './data-test';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selected: null,
      data: null,
      locationChoice:null,
      location:{
        latitude:null,
        longitude:null,
      }
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
  }

  redirect = route => {
    this.props.navigation.navigate(route);
  };

  filterRedirect=()=>{
    this.redirect('filterPicker')
  }

  currentLocation = () => {
    Geolocation.getCurrentPosition(info => {
    console.log(info)
     this.setState({location:{
       latitude:info.coords.latitude,
       longitude:info.coords.longitude,
     }})
    })
  }

  



  filterInput=()=>
  {
    return(
      <View style={Style.searchSection}>
    
      <TextInput
          style={Style.input}
          placeholder="Search for Shops"
          onChangeText={(searchString) => {this.setState({searchString})}}
         
      />
      <TouchableOpacity onPress={()=>this.filterRedirect()}>
      <FontAwesomeIcon style={Style.searchIcon} icon={faFilter} color={'orange'}/>
      </TouchableOpacity>
  </View>
    )
  }
  locationChoices=()=>
  {
    return(
      <View style={{width:'100%',paddingBottom:10}}>
      <Collapse>
        <CollapseHeader style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',backgroundColor:'white',height:40}}>
          <View>
            <Text>Choose Location</Text>
          </View>
        </CollapseHeader>
        <CollapseBody style={{alignItems:'center',justifyContent:'center',flexDirection:'column',backgroundColor:'white'}}>
          <TouchableOpacity
         
          style={{borderBottomWidth:1,width:'100%',padding:10}}
          onPress={()=>this.currentLocation()}>
            <Text>Use Current Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{borderBottomWidth:1,width:'100%',padding:10}}
          onPress={()=>this.redirect('selectLocation')}>
            <Text>Set Location</Text>
          </TouchableOpacity>
          
        </CollapseBody>
      </Collapse>
    </View>
    )
  }

  FlatListItemSeparator = () => {
    return <View style={BasicStyles.Separator} />;
  };

  render() {
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
      <ScrollView
        style={Style.ScrollView}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y <= 0) {
          }
        }}>
        <View
          style={[
            Style.MainContainer,
            {
              minHeight: height,
            },
          ]}>
          {isLoading ? <Spinner mode="overlay" /> : null}
          {this.locationChoices()}
       
       {this.filterInput()}

          {/* Main Feature Product */}
          <Text style={{ fontSize: 17, fontWeight: '600' }}>Main Featured Product</Text>
          <MainFeature details={mainFeaturedProduct} />

          {/* Scrollable Features */}
          <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 10 }}>Scrollable Featured Products</Text>
          <View style={{ height: 150, marginBottom: 10 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                featuredProducts.map(promo => (
                  <Feature key={promo.id} details={promo} />
                ))
              }
            </ScrollView>
          </View>

          {/* Promo Card */}
          <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 10 }}>Promo Card</Text>
          <View style={{ marginBottom: 10 }}>
            <PromoCard details={promo} />
          </View>

          {/* Product Card */}
          <Text style={{ fontSize: 17, fontWeight: '600'}}>Product Card</Text>
          <View style={{ height: 180 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                products.map(product => (
                  <Card key={product.id} details={product} />
                ))
              }
            </ScrollView>
          </View>

          {/* Main Product Card */}
          <Text style={{ fontSize: 17, fontWeight: '600' }}>Main Product Card</Text>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '98%' }}>
              {
                products.map(product => (
                  <MainCard key={product.id} details={product} />
                ))
              }
            </View>
          </View>

        </View>
      </ScrollView>
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
)(Dashboard);
