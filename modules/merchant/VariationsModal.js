import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Color , BasicStyles } from 'common';

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

const Variations = ({ state, cart, selectedProduct, onClose, onAdd }) => {
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [isOnCart, setIsOnCart] = useState(false)

  useEffect(() => {
    setSelectedVariation(null)
    setIsOnCart(false)

    if (cart.length) {
      cart.map(obj => {
        if (selectedProduct && obj.id === selectedProduct.id) {
          setSelectedVariation(obj.selectedVariation)
          setIsOnCart(true)
        }
      })
    }
  }, [selectedProduct])

  let variationsList = <Text>No variation available</Text>
  if (selectedProduct != null && selectedProduct.variation && selectedProduct.variation.length) {
    variationsList = selectedProduct.variation.map(item => {
      let colorVariant = {}
      const fontStyle = {
        fontSize: 12,
        color: selectedVariation && selectedVariation.id === item.id ? Color.white : Color.black
      }

      let payloadValue = item.payload_value 
      if ((item.payload + '').toLowerCase() === 'color') {
        payloadValue = ''
        colorVariant = {
          width: '40%',
          backgroundColor: item.payload_value + '',
          height: 20,
          borderRadius: 10,
          overflow: 'hidden'
        }
      }

      return (
        <TouchableOpacity onPress={() => {
          if (isOnCart) return
          setSelectedVariation(item)
        }}>
          <View
            key={item.id}
            style={{
              maxWidth: '100%',
              flexDirection: 'row',
              minHeight: 25,
              paddingTop: 25,
              paddingBottom: 25,
              paddingHorizontal: 25,
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: Color.primary,
              backgroundColor: selectedVariation && selectedVariation.id === item.id ? Color.primary : isOnCart ? Color.lightGray : Color.white
            }}
          >
            <View style={{ width: '15%' }}>
              <Text style={fontStyle}>
                { item.payload }
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, width: '70%' }}>
              <Text style={{...fontStyle, ...colorVariant}}>
                { payloadValue }
              </Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={fontStyle}>
                { item.price }
              </Text>
              <Text style={fontStyle}>
                PHP
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  const closeModal = () => {
    setSelectedVariation(null)
    onClose()
  }

  return (
    <View>
      <Modal isVisible={state}>
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
                  Select variations
                </Text>
              </View>
              <View style={{
                width: '30%',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
                <TouchableOpacity onPress={() => closeModal()} style={{ paddingRight: 10 }}>
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
              <ScrollView style={{ flex: 1 }}>
                <View>
                  { variationsList }
                </View>
              </ScrollView>
            </View>
            <View style={{
              flexDirection: 'row',
              width: '100%',
              borderTopColor: Color.gray,
              borderTopWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{ width: '50%', alignItems: 'center' }}>
                <TouchableOpacity 
                  onPress={() => closeModal()}
                  underlayColor={Color.gray}
                >
                  <Text style={{
                    color: Color.warning,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                  }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                  width: '50%',
                  alignItems: 'center',
                  borderLeftColor: Color.gray,
                  borderLeftWidth: 1
              }}>
                <TouchableOpacity 
                  onPress={() => onAdd(selectedProduct, selectedVariation)}
                  underlayColor={Color.gray}
                >
                  <Text style={{ 
                    color: Color.primary,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                  }}>
                    { isOnCart ? 'Remove' : 'Add' }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Variations;