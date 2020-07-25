import { Color } from 'common';
import { Dimensions } from 'react-native';
import { Row } from 'native-base';
const width = Math.round(Dimensions.get('window').width);
export default {
  TitleContainer: {
    padding: 25,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Color.white,
    marginLeft:-15,
    marginRight:-15,
  },
  DelvToContainer:
  {
      marginLeft:-5,
      padding:15,
      backgroundColor:Color.white,
  },
  circleContainer:{
      height:20,
      width:20,
      borderRadius:20/2,
      backgroundColor:'white',
      marginLeft:10
  },
  locationContainer:{
    padding:15,
    backgroundColor:Color.white,
    justifyContent:'space-between',
    flexDirection:'row',
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
  numberText: {
    color: Color.white,
    fontSize: 30 
  },
  btn: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginLeft: '5%'
  },
  titleTextSummary: {
    fontSize: 13,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  normalText: {
    fontSize: 12,
    color: Color.gray,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchSection: {
   
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    
},
searchIcon: {
    paddingRight: 30,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#424242',
},
map:{
    position: 'absolute',
    top: 10,
    left: 250,
    right: 10,
    bottom: 10,
  },
  buttonPicked: {
    justifyContent: 'center',
    height: 35,
    width: '30%',
    backgroundColor: 'white',
    borderRadius:50,
    borderColor:'#FF5B04',
    borderWidth:1,
  },


  notPicked:{
    justifyContent: 'center',
    height: 35,
    width: '30%',
    backgroundColor: 'white',
    borderRadius:50,
    borderWidth:1,
    borderColor:'#CCCCCC'
  }
}