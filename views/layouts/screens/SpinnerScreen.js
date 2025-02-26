import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert,Image, Platform,Dimensions,ScrollView,navigate,navigation} from 'react-native';
import {Spinner} from 'native-base';
import {  StackNavigator} from 'react-navigation';
var { width, height } = Dimensions.get('window');

export default class SpinnerScreen extends React.Component {
	render() {
return (
      
        <Spinner color='#b71117' style={[styles.overlay, { height: height}]} />
         
     
    );  
	}
  
}

 const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  // Flex to fill, position absolute, 
  // Fixed left/top, and the width set to the window width
  overlay: {
    
    position: 'absolute',
	zIndex: 1,
    left: 0,
    top: 0,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: width
  }  
});

