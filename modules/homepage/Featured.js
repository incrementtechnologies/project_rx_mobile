import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ColorPropType
} from 'react-native';
import { connect } from 'react-redux';
import {  Color } from 'common';
import Style from './Style.js';
import { Spinner } from 'components';
import { MainCard, Feature, MainFeature, PromoCard } from 'components/ProductThumbnail'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter,faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// TEST DATA FOR PRODUCTS
import { mainFeaturedProduct, featuredProducts, promo, products } from './data-test';
let collectedFilters=['Filipino','City Choices'];
class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      searchString:'',
    };
  }

  componentDidMount() {
    const { user } = this.props.state;
    if (user != null) {
    }
   console.log("current State",this.props.state.productFilter)
  //  console.log(this.props.state.productFilter.length)
  //  if(!this.props.state.productFilter.length)
  //  {
  //    console.log("hello")
  //  }
  }
  redirect = route => {
    this.props.navigation.navigate(route);
  };

  filterRedirect=()=>{
    this.redirect('filterPicker')
  }

  searchedString=(list)=>
 {
  const getValue = value => (typeof value === 'string' ? value.toLowerCase() : value);
  const filteredProducts=this.filterSearch(list,this.props.state.productFilter);

   return filteredProducts.filter(filteredProducts=>getValue(filteredProducts.title).includes(this.state.searchString.toLowerCase())  )
 }

 filterSearch=(products,filters)=>{
  const getValue = value => (typeof value === 'string' ? value.toLowerCase() : value);

   let filtered= products.filter(product=>{
     if(filters.length==0)
     {
       return true
     }
     return filters.some(tag => {
       return product.tags.includes(tag)})
   })

   return(filtered)
 }

  render() {
    const { isLoading, data } = this.state;
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              Style.MainContainer,
              {
                minHeight: height,
                paddingBottom: 150
              },
            ]}>
            {isLoading ? <Spinner mode="overlay" /> : null}

            {/* Main Feature Product */}
            <TouchableOpacity onPress={() => navigate('Merchant', mainFeaturedProduct)}>
              <MainFeature details={mainFeaturedProduct} />
            </TouchableOpacity>

            {/* Scrollable Features */}
            <View style={{ height: 150, marginBottom: 10 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  featuredProducts.map(featuredProduct => (
                    <TouchableOpacity
                      key={featuredProduct.id}
                      onPress={() => navigate('Merchant', featuredProduct)}
                    >
                      <Feature details={featuredProduct} />
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </View>

            {/* Divider */}
            <View 
              style={{ 
                borderBottomColor: 'rgba(0,0,0,0.1)',
                borderBottomWidth: 2,
                marginVertical: 5
              }}
            />

            {/* Promo Card */}
            <View style={{ marginVertical: 10 }}>
              <PromoCard details={promo} />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0.5,borderColor:'black',}}>
            <View style={{padding:14,width:'15%'}}>
    <FontAwesomeIcon style={Style.searchIcon} size={23} icon={faSearch} color={Color.primary}/>
    
    </View>
            <TextInput
        style={{width:'70%'}}
        placeholder="Search for Shops"
        onChangeText={(searchString) => {this.setState({searchString})}}
       
    />
    <TouchableOpacity style={{padding:14,width:'15%'}} onPress={()=>this.filterRedirect()}>
    <FontAwesomeIcon style={Style.searchIcon} size={23} icon={faFilter} color={Color.primary}/>
    </TouchableOpacity>
</View>

    {/* Main Product Card */}
    <View style={{ alignItems: 'center' }}>
              {/* width: 98% !important */}
              <View style={{ width: '98%' }}>

{this.searchedString(products).map((product)=>(
                         <TouchableOpacity
                         key={product.id}
                         onPress={() => navigate('Merchant', product)}
                       >
                         <MainCard key={product.id} details={product} />
                       </TouchableOpacity>
                    ))
                }
              </View>
            </View>

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
)(Featured);
