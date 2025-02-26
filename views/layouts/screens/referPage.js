import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
import { FlatGrid } from 'react-native-super-grid';
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;
var BaseUrl="https://timelinemw.com/api/getproducts";
export default class referPage extends Component {
	static navigationOptions = {
    header: null ,
	// !!! Hide Header
  }
	constructor(){
				        super();
						this.state = {
						Language:'English',
						isLoading:false,
												
						}
}
	componentDidMount() {
		  
		
		}
		
	
 agree(){
        AsyncStorage.setItem('Iagree','yes');
        this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'customerLogin'}]});
		
    }
	
		
  render() {
	  const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
		var loaderButton;
        if(this.state.isLoading)
        {
            loaderButton =<SpinnerScreen />;
        }
        else
        {
            loaderButton =false;
        }
	  
		return (<StyleProvider style={getTheme(material)}>
				  <Container style={{backgroundColor:'#ffffff'}}>
				 <Content>
					 <View style={{paddingTop:5}}>
						 <Image source={require('../assets/notes.jpg')} style={{flex: 1,resizeMode: 'contain',width:width,height:height }} />
					</View>
				</Content>
					<Footer style={{backgroundColor:'#b71117'}}>
						<FooterTab style={{backgroundColor:'#b71117'}}>
							<Button style={{backgroundColor:'#b71117'}} onPress={()=>this.agree()}>
							   <Text style={{color:'#ffffff'}}>Next</Text>
							</Button>
						</FooterTab>
					</Footer>
				</Container>
				</StyleProvider>
	  
    );
  }
}

