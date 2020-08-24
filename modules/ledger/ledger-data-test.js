/**
 * TEST DATA FOR PRODUCT THUMBNAILS
 */

const ledgerData = [{
  id: 0,
  amount:500,
  merchant:"Idobao",
  description:"Test",
  payment_payload:"COD",
  currency:"PHP",
  offset:"+",
},
{
  id: 1,
  amount:1500,
  merchant:"Nvidia",
  description:"Test2",
  payment_payload:"COP",
  currency:"PHP",
  offset:"+",
},
{
  id: 2,
  amount:2500,
  merchant:"KBDFans",
  description:"Test3",
  payment_payload:"Gcash",
  currency:"PHP",
  offset:"-",
},
{
  id: 3,
  amount:3500,
  merchant:"www.steampowered.comsdfgsdfgsdfgsdfgsdfg345345345",
  description:"Test4",
  payment_payload:"Paymaya",
  currency:"PHP",
  offset:"-",
}
]

const UserLocation = {
  latitude: 10.3500708,
  longitude: 123.9155313
}

export {
  ledgerData,
  UserLocation
}