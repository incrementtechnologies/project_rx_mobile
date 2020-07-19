import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
export default {
  modal: {
    backgroundColor: Color.gray
  },
  MainContainer: {
    flex: 1,
  },
  sliderContainer: {
    flex: 1,
    minHeight: height,
    width: '100%',
    paddingHorizontal: 20
  },
  ScrollView: {
    flex: 1
  }
}