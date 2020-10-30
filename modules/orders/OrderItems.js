import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Color , BasicStyles, Routes } from 'common';
import { Spinner } from 'components';
import Config from 'src/config.js'
import Api from 'services/api';

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

const OrderItems = ({ visible, setVisible, data }) => {
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (visible && data == null) {
      Alert.alert(`Sorry, an error have occured. Please try again`)
      return null
    } else {
      const parameter = {
        condition: [{
          column: 'checkout_id',
          clause: '=',
          value: data.id
        }]
      }
      Api.request(Routes.orderItemsRetrieve, parameter, (response) => {
        setLoading(false)
        setError(false)
        if (response.data.length) {
          setItems(response.data)
        } else {
          setItems([])
        }
      }, (error) => {
        setLoading(false)
        setError(true)
        setItems([])
        console.log({ orderItemsError: error })
      })
    }
  }, [data])

  let itemList = null
  if (items.length) {
    itemList = items.map(item => {
      const imageUrl = item?.images?.length ? Config.BACKEND_URL + item.images[0].url : null
      return (
        <View
          key={item.id}
          style={{
            maxWidth: '100%',
            flexDirection: 'row',
            minHeight: 25,
            marginTop: 25,
            paddingBottom: 25,
            paddingHorizontal: 25,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: Color.primary
          }}
        >
          <View style={{ width: '15%' }}>
            <Image
              source={ imageUrl ? { uri: imageUrl } : null }
              style={{
                height: 50,
                width: '100%'
              }}
            />
            <Text
              style={{ 
                textAlign: 'center',
                position: 'absolute',
                right: 0,
                bottom: 0,
                fontSize: 10,
                color: Color.white,
                backgroundColor: Color.primary,
                width: 16,
                height: 16,
                borderRadius: 8,
              }}
            >
              { item.qty }
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10, width: '70%' }}>
            <Text style={{ fontSize: 12 }}>
              { item.title }
            </Text>
          </View>
          <View style={{ width: '15%' }}>
            <Text style={{ fontSize: 12 }}>
              { item.price }
            </Text>
            <Text style={{ fontSize: 12 }}>
              PHP
            </Text>
          </View>
        </View>
      )
    })
  } else {
    itemList = (
      <Text style={{ textAlign: 'center', marginVertical: '50%' }}>
        No items found!
      </Text>
    )
  }

  return (
    <View>
      <Modal isVisible={visible}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            height: height - 100,
            width: width - 40,
            borderRadius: 10,
            backgroundColor: Color.white
          }}>
            <View style={{
              width: '100%',
              borderBottomColor: Color.primary,
              borderBottomWidth: 1,
              flexDirection: 'row'
            }}>
              <View style={{ width: '70%' }}>
                <Text style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 10,
                }}>
                  Ordered Items
                </Text>
              </View>
              <View style={{
                width: '30%',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
                <TouchableOpacity onPress={() => setVisible()} style={{ paddingRight: 10 }}>
                  <FontAwesomeIcon icon={ faTimes } style={{
                    color: Color.danger
                  }} size={BasicStyles.iconSize} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{
              width: '100%',
              height: height - (200)
            }}>
              {
                isLoading
                ? ( //== Loading **
                    <View style={{ marginVertical: '50%' }}>
                      <Spinner mode="overlay"/> 
                    </View>
                  ) 
                : ( //== Not loading **
                  isError 
                  ? ( // If Error
                      <Text style={{ textAlign: 'center', marginVertical: '50%' }}>
                        There's an error fetching checkout items, please try again
                      </Text>
                    )
                  : (
                      <ScrollView style={{ flex: 1 }}>
                        { itemList }
                      </ScrollView>
                    )
                  )
              }
            </View>
          </View>
        </View>
        {/* {isLoading ? <Spinner mode="overlay"/> : null } */}
      </Modal>
    </View>
  )
}

export default OrderItems;
