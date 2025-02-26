import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast } from 'native-base';
import getTheme from '../native-base-theme/components';

import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';

import Expo from 'expo';
import logo from '../assets/splash.png';


var FirstScreen='Home';


export default class splash extends React.Component{
	
	
    static navigationOptions = {
    header: null
    }
	
	
    componentDidMount()
    {
		this.login();
  
	}
	Terms()
	{
	
	AsyncStorage.getItem("Iagree").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
                                              this.login();
                                           }
                                           else
                                           {
                                             this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'referPage'}]});
                                           }
                                          
                                           }).done();
										   
	}
	login()
	{
		
	       AsyncStorage.getItem("CustomerDetails").then((value) => {
		   if(value){
			   
			   const item = JSON.parse(value);
			   this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'customerHome'}]});
		   }
		   else{
			   this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'customerLogin'}]});
		   }
		  
		   }).done();
	}
    render() {
        
     
        
        return (		
            <View  style={{backgroundColor:'#b71117'}}/>
			     );
    }
}