import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  ScrollView: {
    padding: 20
  },
  MainContainer: {
    width: '100%',
    paddingBottom: 50
  },
  TextContainer: {
    flex: 1
  },
  Card: {
    borderRadius: 10,
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: 'bold' 
  },
buttonContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 30,
  marginTop:30,
  marginLeft:30,
  marginRight:30,
},
circle: {
  height: 20,
  width: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ACACAC',
  alignItems: 'center',
  justifyContent: 'center',
},
checkedCircle: {
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: '#794F9B',
},
label: {
  color: "black",
  fontSize: 12,
},
input: {
  fontSize: 16,
  color: "black",
},
container: {
  backgroundColor: "#F5F5F5",
  marginTop: 60,
},
}