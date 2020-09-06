import Geolocation from '@react-native-community/geolocation'
/**
 * must be used in an async function
 * 
 * e.g.
 * const coords = await GetDeviceLocation()
 * coords.latitude (access latitude)
 * coords.longitude (access longitude)
 */
export default getDeviceLocation = async () => {
  const pos = await new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
  };
};
