import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  ScrollView: {
  },
  MainContainer: {
    flex: 1
  },
  TextContainer: {
    width: width
  }
}