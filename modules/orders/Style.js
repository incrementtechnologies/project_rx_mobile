import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  ScrollView: {
    flex: 1,
  },
  MainContainer: {
    flex: 1
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
    flex: 1,
    padding: 20
  },
  orderCard: {
    width: '100%',
    flexDirection: 'row',
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.gray,
    borderRadius: 10,
    marginBottom: 20
  }
}