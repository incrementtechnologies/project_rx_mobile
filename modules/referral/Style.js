import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  ScrollView: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20
  },
  header: {
    width: '100%',
    padding: 20,
    alignItems: 'center'
  },
  referralMessage: {
    width: '90%',
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
    padding: 10
  },
  inputContainer: {
    borderColor: Color.gray,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5
  },
  text: {
    color: Color.normalGray
  },
  sectionHeadingStyle: {
    paddingBottom: 10,
    alignItems: 'center'
  },
}