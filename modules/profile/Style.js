import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  ScrollView: {
    padding: 10
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: Color.normalGray
  },
  sectionHeadingStyle: {
    paddingBottom: 10,
    alignItems: 'center'
  },
  alertMessage: {
    width: '100%',
    position: 'relative',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
}