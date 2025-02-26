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

var baseUrl="https://timelinemw.com/api/";
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
    
    callNumber = (url) =>{
        Linking.canOpenURL(url).then(supported => {
                                     if (!supported) {
                                     // console.log('Can\'t handle url: ' + url);
                                     } else {
                                     return Linking.openURL(url);
                                     }
                                     }).catch(err => console.error('An error occurred', err));
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
          
        var msg='';
        if(!this.state.phoneNumber){
            this.setState({PhoneError:'Enter the Mobile Number.',isLoading:false});
			return;
        }
     console.log(baseUrl+'invitefriend?Mobile='+this.state.phoneNumber+'&Id='+this.state.Id);
			this.setState({isLoading:true});
           fetch(baseUrl+'invitefriend?Mobile='+this.state.phoneNumber+'&Id='+this.state.Id, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
            .then((responseData) => {
                  console.log(responseData);
                  
                  if(responseData.errorCode==0){
					  Toast.show({
                text: 'invite successful!',
                buttonText:'Ok',
                type: "success"
              })
					this.setState({isLoading:false,phoneNumber:''});  
                
                  }else if(responseData.errorCode==1){
                  this.setState({PhoneError:responseData.message,isLoading:false});
                  }
				  else if(responseData.errorCode==2 || responseData.errorCode==3){
                  this.setState({PhoneError:responseData.message,isLoading:false});
                  }
                  
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
       
        
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
		AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({loggin:true,Name:item.Name,Id:item.Id});
											   
											   
                                           }
                                           else
                                           {
                                             this.setState({nodata:true,isLoading:false});
                                               
                                           }
                                          }).done();
         AsyncStorage.getItem("settingsDetails").then((value) => {
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({countryCode:item.countryCode});
											 
                                           }
                                           else
                                           {
                                             this.setState({nodata:true,isLoading:false});
                                               
                                           }
                                          }).done();
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
                <Header style={{height:80,backgroundColor:'#ffffff'}}>
					{loaderButton}
				<StatusBar/>
					<Left style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.props.navigation.goBack()}>
							<Icon  style={{fontSize:30, color:'#b71117'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
						<Body style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					     <Text style={{color:'#b71117',fontSize:15}}>Invite Customer</Text>
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>				 
                      
					</Right>
					
				</Header>
                
                
                <Content contentContainerStyle={{padding: 0, margin:0}}>
               <Text style={{fontSize:12,textAlign:'center',paddingTop:10}}>You can earn 1000 MK referral CashBack by inviting new users to TimeLine Electronics. Once the referred both users will receive the CashBack.</Text>
                     <View style={{margin:8}}>
                
                                <TextField
                                value={this.state.phoneNumber}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={(phoneNumber) => this.setState({phoneNumber:phoneNumber,PhoneError:''})}
                                returnKeyType='next'
                                keyboardType='numeric'
								autoCapitalize='none'
                                maxLength={12}
								labelHeight={12}
								prefix={(this.state.countryCode)?this.state.countryCode:'+91'}
                                label={'Mobile'}
                                textColor='#000000'
                                tintColor='#000000'
                                baseColor='#000000'
                                error={this.state.PhoneError}
                                />
                                
                     </View>
					
         
				            <View style={{flexDirection:'row', marginTop:30, alignItems:'center', justifyContent:'center'}}>
                                    <Button transparent style={{borderRadius: 10,backgroundColor: '#b71117',width:200,alignItems: 'center', justifyContent:'center'}}  onPress={this.onSubmit}>
                                       <Text style={{fontSize:Platform.OS === 'ios' ?20:16,color:'white',textAlign:'center'}}>Invite</Text>
                                    </Button>
                             </View>
		
                </Content>
				
   <Footer style={{backgroundColor:'#ffffff'}}>
					<FooterTab style={{backgroundColor:'#ffffff'}}>
					<Button vertical onPress={() => this.props.navigation.navigate('customerSales')  }>
					<Icon style={{color:'#808080'}} name="apps" />
					<Text>Sales</Text>
					</Button>
					<Button vertical onPress={() => this.props.navigation.navigate('customerCoupons')  }>
					<Icon style={{color:'#808080'}} name="ios-pricetag" />
					<Text>Coupons</Text>
					</Button>
					<Button vertical onPress={() => this.props.navigation.navigate('QrcodeScanner')  }>
					<Icon style={{color:'#808080'}} name="ios-qr-scanner" />
					<Text>QR Code</Text>
					</Button>
					<Button vertical>
					<Icon style={{color:'#b71117'}} name="ios-person-add" />
					<Text style={{color:'#b71117'}}>Invite</Text>
					</Button>
					<Button vertical onPress={() => this.props.navigation.navigate('facebook')  }>
					<Icon style={{color:'#808080'}} name="logo-facebook" />
					<Text>FaceBook</Text>
					</Button>
					</FooterTab>
					</Footer>
                </Container>
                </StyleProvider>
				</Root>
                );
    }
}