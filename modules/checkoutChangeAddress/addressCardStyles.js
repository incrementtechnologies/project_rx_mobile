import { Color } from 'common';
export default {
  container: {
    minHeight: 100,
    width: '100%',
 
 
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
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
    padding:10,
    width:'100%',
    height:50,
   
  },
  AddressType:{
    paddingLeft:10,
    fontWeight:'bold',
    fontSize:20
  },
  editDeleteIcons:{
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  locationInformation:{
    paddingLeft:10,
    fontWeight:'bold',
    fontSize:20,
    paddingBottom:10,
    paddingRight:10,
  },
  locationText:{
    fontSize:15,
    padding:1,
   
    
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    marginLeft:10,
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


}