import { Dimensions } from 'react-native';
import { Color } from 'common';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default {
  MainContainer: {
    flex: 1,
    position: 'relative'
  },
  container: {
    flex: 1,
    // paddingTop: 300,
    height: '100%',
    width: '100%'
  },
  upperSection: {
    height: '90%'
  },
  bottomSection: {
    height: '10%'
  },
  cartIconContainer: {
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cartNumItems: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Color.white,
    height: 12,
    width: 12,
    borderRadius: 6
  },
  ScrollViewVertical: {
    flex: 1
  },
  merchantHeader: {
    position: 'relative',
    width: '100%',
    height: height * .3
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  merchantDetails: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row'
  },
  avgRating: {
    color: Color.white,
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 3
  },
  totalReviews: {
    color: Color.white,
    fontSize: 12
  },
  timeAndDistance: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  deliveryTime: {
    color: Color.white,
    marginLeft: 5
  },
  circleDivider: {
    color: Color.white,
    marginHorizontal: 5
  },
  distance: {
    color: Color.white
  },

  // PRODUCTS
  merchantProductsContainer: {
    width: '100%',
    paddingHorizontal: 10,
    // borderWidth: 3,
    borderColor: 'red'
  },
  categoryText: {
    fontSize: 17,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  section: {
    padding: 10
  },
  productContainer: {
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingRight: 10,
    height: 80
  },
  productTitle: {
    fontWeight: '500'
  },
  productPrice: {
    fontWeight: '500'
  },
  productImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },

  //Bottom tab
  ScrollViewTab: {
  },
  tabBar: {
    height: '100%',
    flexDirection: 'row',
  },
  tabItem: {
    width: (width/2),
    alignItems: 'center',
    justifyContent: 'center'
  },
}