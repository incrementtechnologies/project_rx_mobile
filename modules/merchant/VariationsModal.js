import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { Color , BasicStyles } from 'common';

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

const Variations = ({ state, cart, selectedProduct, onClose, onAdd }) => {
  const [selectedVariation, setSelectedVariation] = useState([])
  const [isOnCart, setIsOnCart] = useState(false)

  useEffect(() => {
    setSelectedVariation([])
    setIsOnCart(false)

    if (cart.length) {
      cart.map(obj => {
        if (selectedProduct && obj.id === selectedProduct.id) {
          if (obj.hasOwnProperty('selectedVariation')) {
            setSelectedVariation([...obj.selectedVariation])
            setIsOnCart(true)
          }
        }
      })
    }
  }, [selectedProduct])

  const onAddQuantity = (item) => {
    // 1) find item on selectedVariation array
    const existingItem = selectedVariation.find(obj => obj.id === item.id)
    // 2) find index of that item on selectedVariation array
    // finding index must use the 'existingItem' variable.
    // passing directly the 'item' parameter always results to '-1'
    // since the quantity property of the item in selectedVariation array is already changed
    const index = _.indexOf(selectedVariation, existingItem)

    if (index === -1) { // if item is not yet added in selectedVariation array
      const newItem = {...item}
      newItem.quantity = 1
      setSelectedVariation(prevState => [...prevState, newItem])
    } else { // update quantity of that item in selectedVariation array
      const updatedArray = [...selectedVariation]
      const updatedItem = {...selectedVariation[index]}
      updatedItem.quantity += 1
      updatedArray[index] = updatedItem
      setSelectedVariation(updatedArray)
    }
  }

  const onMinusQuantity = (item) => {
    // 1) find item on selectedVariation array
    const existingItem = selectedVariation.find(obj => obj.id === item.id)
    // 2) find index of that item on selectedVariation array
    // finding index must use the 'existingItem' variable.
    // passing directly the 'item' parameter always results to '-1'
    // since the quantity property of the item in selectedVariation array is already changed
    const index = _.indexOf(selectedVariation, existingItem)

    if (index < 0) return
    if (existingItem.quantity > 1) {
      const updatedArray = [...selectedVariation]
      const updatedItem = {...selectedVariation[index]}
      updatedItem.quantity -= 1
      updatedArray[index] = updatedItem
      setSelectedVariation(updatedArray)
    } else {
      const newArray = [...selectedVariation]
      newArray.splice(index, 1)
      setSelectedVariation(newArray)
    }
  }

  const closeModal = () => {
    setSelectedVariation([])
    onClose()
  }

  let variationsList = <Text>No variation available</Text>
  if (selectedProduct != null && selectedProduct.variation && selectedProduct.variation.length > 0) {
    variationsList = selectedProduct.variation.map(item => {
      let colorVariant = {}
      const find = selectedVariation.find(obj => obj.id === item.id)
      const index = _.indexOf(selectedVariation, find)
      const isSelected = index !== -1 ? true : false
      const fontStyle = {
        fontSize: 12,
        color: isSelected ? Color.white : Color.black
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
            backgroundColor: isSelected ? Color.primary : Color.white
          }}
        >
          <View style={{ width: '15%' }}>
            <Text style={fontStyle}>
              { item.payload }
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10, width: '40%' }}>
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
          <View
            style={{ 
              width: '30%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }>
            <TouchableOpacity onPress={() => onMinusQuantity(item)}>
              <FontAwesomeIcon
                icon={ faMinus }
                style={{
                  color: isSelected ? Color.white : Color.primary
                }}
                size={20}
              />
            </TouchableOpacity>
            <Text style={{...fontStyle, marginHorizontal: 10 }}>
              { isSelected ? selectedVariation[index].quantity  : 0 }
            </Text>
            <TouchableOpacity onPress={() => onAddQuantity(item)}>
              <FontAwesomeIcon
                icon={ faPlus }
                style={{
                  color: isSelected ? Color.white : Color.primary
                }}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
    })
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
                  <FontAwesomeIcon
                    icon={ faTimes }
                    style={{
                      color: Color.danger
                    }}
                    size={BasicStyles.iconSize}
                  />
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
                  onPress={() => {
                    if (isOnCart) { // removing all variations
                      Alert.alert(
                        "Remove product",
                        "Are you sure you want to remove all variations you have set from this product?",
                        [
                          { text: "No" },
                          { text: "Yes", onPress: () => onAdd(selectedProduct, selectedVariation) },
                        ],
                        { cancelable: true }
                      );
                    } else {
                      closeModal()
                    }
                  }}
                  underlayColor={Color.gray}
                >
                  <Text style={{
                    color: isOnCart ? Color.danger : Color.black,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                  }}>
                    { isOnCart ? 'Remove' : 'Cancel' }
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
                  onPress={() => {
                    if (!isOnCart && selectedVariation.length < 1) {
                      Alert.alert('Notice', 'Please specify the quantity of the variation you want to add')
                    } else {
                      const isUpdating = isOnCart && selectedVariation.length > 0
                      onAdd(selectedProduct, selectedVariation, isUpdating)
                    }
                  }}
                  underlayColor={Color.gray}
                >
                  <Text style={{ 
                    color: Color.success,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                  }}>
                    { isOnCart ? 'Update' : 'Add' }
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