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
   
    
  }


}