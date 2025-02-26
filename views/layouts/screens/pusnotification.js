import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast,Icon } from 'native-base';
import getTheme from '../native-base-theme/components';
import { TextField } from 'react-native-material-textfield';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';
//import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import PhoneInput from 'react-native-phone-input';

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

var baseUrl="http://www.nikhilb.co.in/timeline/api/";
export default class Login extends React.Component{
	
	
	
    static navigationOptions = {
    header: null
    }
    
    constructor(props) {
        super(props);
        
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.phoneRef = this.updateRef.bind(this, 'Phone');
        
        this.onPressFlag = this.onPressFlag.bind(this);
        this.state = {
            
        Phone: '',
        PhoneError: '',
        Coupon:'',
        authKey:'',
        phoneNumber:'',
        PhNumber:'',
        
        };
    }
    
     componentWillReceiveProps(nextProps) {
      
    }
	
	
    onFocus() {
        //Alert.alert('Test');
        
        this.setState({ContentField:true});
        let { errors = {} } = this.state;
        
        for (let name in errors) {
            let ref = this[name];
            
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
        
        this.setState({ errors });
    }
    

    
    onChangeText(text) {
        
        ['Phone']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
                 if (ref.isFocused()) {
                 this.setState({ [name]: text });
                 }
                 });
    }
    
    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }
    

    
    onSubmit() {
        
        this.setState({isLoading:true});
        let errors = {};
        let datas = {};
        var msg='';
		
        if(!this.state.Title){
            this.setState({TitleError:'Enter the Title.',isLoading:false});
			return;
        }
        if(!this.state.Description){
            this.setState({DescriptionError:'Enter the Description.',isLoading:false});
			return
        }
        
        
        if(this.isEmpty(errors))
        {
			this.setState({isLoading:true});
              console.log(baseUrl+'pushnotication?Title='+this.state.Title+'&Description='+this.state.Description);
               fetch(baseUrl+'pushnotication?Title='+this.state.Title+'&Description='+this.state.Description, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                 .then((responseData) => {
                  console.log(responseData);
                  this.setState({isLoading:false});
						if(responseData.errorCode==0){
						Toast.show({
						text: 'Sent successfully!',
						buttonText:'Ok',
						type: "success"
						})
						
					       setTimeout(() => {
					  		            this.props.navigation.navigate('Home',{refresh:'yes'});
						 }, 1000);
				  
				 
                  
                  }else if(responseData.errorCode==1){
                  this.setState({PhoneError:responseData.message,isLoading:false});
                  }
				  else if(responseData.errorCode==2 || responseData.errorCode==3){
                  this.setState({CouponError:responseData.message,isLoading:false});
                  }
                  
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
        }else
        {
            this.setState({PhoneError:msg,isLoading:false});
        }
        
        
        
    }
    
    refresh(){
		
	}
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    
    
    
    

    onPressFlag() {
		//console.log(this.countryPicker);
		this.countryPicker.openModal();
		
	//this.countryPicker.open();
	}
	
	onSelectCountry(code) {
		console.log(code);
		//this.countryPicker.openModal();
		
	//this.countryPicker.open();
	}

	selectCountry(country) {
		console.log(country);
	this.phone.selectCountry(country.cca2.toLowerCase());
	this.setState({ cca2: country.cca2 ,callingCode:country.callingCode});
	}
    
    
    updateRef(name, ref) {
        this[name] = ref;
    }
    componentDidMount()
    {
       
    }
	
    
    render() {
        
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
		
        //let { errors = {}, secureTextEntry, ...data } = this.state;
        //let { Phone = 'Phone' } = data;
        
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
		<Root>
                <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor:'#ffffff'}}>
                <Header style={{height:80,backgroundColor:'#b71117'}}>
					{loaderButton}
				<StatusBar/>
					<Left style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.props.navigation.goBack()}>
							<Icon  style={{fontSize:30, color:'#ffffff'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
						<Body style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					     <Text style={{color:'#ffffff',fontSize:15}}>Notifiocatons</Text>
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>				 
                      
					</Right>
					
				</Header>
                
                
                <Content contentContainerStyle={{padding: 0, margin:0}}>
				
                     <View style={{margin:8}}>
                
                                <TextField
                                value={this.state.Title}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={(Title) => this.setState({Title:Title,TitleError:''})}
                                returnKeyType='next'
                                keyboardType='default'
								//autoCapitalize='none'
                                maxLength={12}
								labelHeight={12}
								//prefix='+91'
                                label={'Title'}
                                textColor='#000000'
                                tintColor='#000000'
                                baseColor='#000000'
                                error={this.state.TitleError}
                                />
                                
                     </View>
					 <View style={{margin:8}}>
                
                                <TextField
                                value={this.state.Description}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={(Description) => this.setState({Description:Description,DescriptionError:''})}
                                returnKeyType='next'
                                keyboardType='default'
								//autoCapitalize='none'
                                //maxLength={12}
								labelHeight={12}
								multiline={true}
                                label={'Description '}
                                textColor='#000000'
                                tintColor='#000000'
                                baseColor='#000000'
                                error={this.state.DescriptionError}
                                />
                                
								
                     </View>
					
				            <View style={{flexDirection:'row', marginTop:30, alignItems:'center', justifyContent:'center'}}>
                                    <Button transparent style={{borderRadius: 10,backgroundColor: '#b71117',width:200,alignItems: 'center', justifyContent:'center'}}  onPress={this.onSubmit}>
                                    <Text style={{fontSize:Platform.OS === 'ios' ?20:16,color:'white',textAlign:'center'}}>Send</Text>
                                    </Button>
                            </View>
				
               
				
                </Content>
				
				
               
                
                </Container>
                </StyleProvider>
				</Root>
                );
    }
}