import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,WebView  } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast,Icon } from 'native-base';
import getTheme from '../native-base-theme/components';
import { TextField } from 'react-native-material-textfield';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';
//import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import PhoneInput from 'react-native-phone-input';

import { FlatGrid } from 'react-native-super-grid';
//import { Ionicons } from '@expo/vector-icons';
//import Expo from 'expo';
import { Font } from 'expo';
import logo from '../assets/icon.png';
//import mini from '../assets/mini.png';
var {width, height} = Dimensions.get("window");

var deviceWidth = Dimensions.get("window").width;

const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

var FirstScreen='Home';
const COUNTRY_LIST = ['IN', 'SA'];

export default class Home extends React.Component{
	
	
	
    static navigationOptions = {
    header: null
    }
    
    constructor(props) {
        super(props);
       this.state = {
        isLoading:true,
        resourceData:[],
        
        };
    }
    
     componentWillReceiveProps(nextProps) {
      
    }
	
    
    refresh(){
		
	}
   
 
    componentDidMount()
    {
        fetch('http://weconnectstudents.in/wallet/api/sales', {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  //console.log('dealsOf',responseData);
				  if(responseData.errorCode==0){
				         this.setState({resourceData:responseData.result,isLoading:false});
				  
				  }else{
					  this.setState({resourceData:[],nodata:true,isLoading:false,});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
    }
    
    render() {
		 
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
		
        //let { errors = {}, secureTextEntry, ...data } = this.state;
        //let { Phone = 'Phone' } = data;
        const data = this.state.resourceData;
        var loaderButton;
        if(this.state.isLoading)
        {
            loaderButton =<SpinnerScreen />;
        }
        else
        {
            loaderButton =false;
        }
        
        
      
        
        return (
		<WebView
        source={{uri: 'https://www.facebook.com/timelineelectronic/'}}
        style={{marginTop: 20}}
      />
		
                );
    }
}

