import React, { Component } from 'react';
import Style from './Style.js';
import { View, Text, ScrollView, FlatList, TouchableHighlight, TouchableOpacity} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import { Empty } from 'components';
import Api from 'services/api/index.js';
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
const height = Math.round(Dimensions.get('window').height);
class Settings extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      isLoading: false,
      themes: [{
        primary: '#FF5B04',
        secondary: '#ffaa81',
        tertiary: '#ff0000',
        title: 'Foods & Restaurant',
        description: 'Colors good for foods.'
      }, {
        primary: '#003049',
        secondary: '#D62828',
        tertiary: '#F77F00',
        title: 'Blue red orange',
        description: 'Darker'
      }, {
        primary: '#FFCDB2',
        secondary: '#E5989B',
        tertiary: '#6D6875',
        title: 'Lighter colors',
        description: 'lighter'
      }]
    }
  }

  redirect = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'drawerStack',
      action: StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({routeName: 'Settings'}),
        ]
      })
    });
    this.props.navigation.dispatch(navigateAction);
  }

  setTheme(theme){
    Color.setPrimary(theme.primary)
    Color.setSecondary(theme.secondary)
    Color.setTertiary(theme.tertiary)
    this.redirect()
    const { setTheme } = this.props;
    setTheme(theme)
  }

  FlatListItemSeparator = () => {
    return (
      <View style={BasicStyles.Separator}/>
    );
  };

  themes = () => {
    const { selected, themes } = this.state;
    return(
      <View>
        <View>
          <Text style={{
            color: Color.primary,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10
          }}>Choose theme</Text>
        </View>
        <FlatList
          data={themes}
          extraData={selected}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item, index }) => (
            <View>
              <TouchableHighlight
                onPress={() => {this.setTheme(item)}}
                underlayColor={Color.lightGray}
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingTop: 10,
                  background: Color.primary === item.primary ? Color.lightGray : Color.white
                }}
                >
                <View style={{
                  flexDirection: 'row',
                }}>
                  <View style={{
                    width: '60%'
                  }}>
                    <Text style={{
                      paddingTop: 10
                    }}>{item.title}</Text>
                    <Text style={{
                      fontSize: 12,
                      paddingBottom: 10,
                      fontStyle: 'italic',
                      color: Color.gray
                    }}>{item.description}</Text>
                  </View>
                  <View style={{
                    width: '40%',
                    flexDirection: 'row',
                    paddingTop: 10,
                    justifyContent: 'flex-end'
                  }}>
                    <FontAwesomeIcon icon={faCircle} size={30} style={{
                      color: item.primary,
                      marginRight: 5
                    }}/>
                    <FontAwesomeIcon icon={faCircle} size={30} style={{
                      color: item.secondary,
                      marginRight: 5
                    }}/>
                    <FontAwesomeIcon icon={faCircle} size={30} style={{
                      color: item.tertiary,
                      marginRight: 5
                    }}/>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  render() {
    const { notifications } = this.props.state;
    const { selected, isLoading } = this.state;

    return (
      <ScrollView
        style={Style.ScrollView}
        onScroll={(event) => {
          if(event.nativeEvent.contentOffset.y <= 0) {
            if(this.state.isLoading == false){
              // this.retrieve()
            }
          }
        }}
        >
        <View style={[Style.MainContainer, {
          minHeight: height
        }]}>
          <View>
            <Text style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: 'right'
            }}>
              Language: English
            </Text>
          </View>
          {
            (this.themes())
          }
              
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setTheme: (theme) => dispatch(actions.setTheme(theme))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);