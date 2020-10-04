import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  ScrollView: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 20,
    alignItems: 'center'
  },
  notLoggedIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  textWhite: {
    color: '#fff'
  },
  orderHistory: {
    flex: 1
  },
  orderCard: {
    width: '100%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    minHeight: 100,
    padding: 20,
  },
  myOrderDetailsContainer: {
    flex: 1,
    alignItems: 'center'
  },
  orderDetails: {
    flex: 1,
    padding: 20,
    minHeight: 150,
    width: '90%',
    marginVertical: 10,
 
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: 5,
    borderColor: '#ddd',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  detailRow: {
    marginVertical: 5
  },
  detailsButton: {
    padding: 10,
    marginVertical: 10,
    minWidth: 100,
    backgroundColor: Color.primary,
    borderRadius: 10
  }
}