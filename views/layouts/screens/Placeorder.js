import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,Modal } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast,Icon,CheckBox,H1,H2 } from 'native-base';
import getTheme from '../native-base-theme/components';
import { TextField } from 'react-native-material-textfield';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';
//import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import PhoneInput from 'react-native-phone-input';

//import { Ionicons } from '@expo/vector-icons';
//import Expo from 'expo';
import { Font } from 'expo';
import mini from '../assets/logo.png';
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

var BaseUrl="https://timelinemw.com/api/";
export default class Placeorder extends React.Component{
	
	
	
    static navigationOptions = {
    header: null
    }
    
    constructor(props) {
        super(props);
     
        this.state = {
            
        Phone: '',
        PhoneError: '',
        Coupon:'',
        authKey:'',
        phoneNumber:'',
        responseData:[],
        resourceData:[],
		isModalVisible:false,
        
        };
    }
    
     componentWillReceiveProps(nextProps) {
      
    }
	
	
   
    
    onSubmit() {
          
       
       
        
    }
    
   
    
    
    

   
    componentDidMount(){
		//console.log(this.props.navigation.state.params.orderId);
		//this.Getorder(this.props.navigation.state.params.orderId);
		AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({loggin:true,Name:item.Name,Id:item.Id});
											   //this.GetAddress(item.Id);
											   
											   
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
	 Getorder(orderId){
			console.log(BaseUrl+'uniqueorders?orderIndexId='+orderId);
		      return fetch(BaseUrl+'uniqueorders?orderIndexId='+orderId, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log('deals',responseData.result.orderDetails);
				  this.setState({resourceData:responseData.result.orderDetails,
				  TotalItem: responseData.result.totalItems,
				  TotalPrice: responseData.result.totalPrice,
				  bookingDateTime: responseData.result.bookingDateTime,
				  Address: responseData.result.deliveryAddress,
				  orderRandId: responseData.result.orderId,
				  isLoading:false
				  
				  });
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	     }
	
	_toggleModal = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible});
 }
 SelectAddress(id,address){
	 //console.log(address);
	 this.props.navigation.navigate('checkoutList', {address: address})
 }
  SelectHomeAddress(){
	 //console.log(address);
	 this.props.navigation.navigate('checkoutList', {address: 'Livingstonia Avenue Next Door To LIMBE mosque,Limbe,Malawi'})
 }
    
    render() {
        
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
		
        //let { errors = {}, secureTextEntry, ...data } = this.state;
        //let { Phone = 'Phone' } = data;
        const responseData = this.state.responseData;
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
		<Root>
                <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor:'#ffffff'}}>
				{loaderButton}
                <Header style={{height:80,backgroundColor:'#ffffff'}}>
				
				<StatusBar/>
               	    <Left style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						 <TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.props.navigation.navigate('customerHome', {refresh: () => this.refresh()})}>
						   <Icon  style={{fontSize:30, color:'#b71117'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
					<Body style={{flex:2,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):25}}>
					     <Thumbnail square   style={{width:100,height:50}} source={mini} />
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end',paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					<Button vertical transparent onPress={() => this.props.navigation.navigate('customerHome',{backRefresh:'yes'}) }	>				
					     <Icon name="home" style={{color:'#b71117',fontSize:25}} />
					     <Text style={{color:'#b71117',fontSize:15}}>Home</Text> 
					</Button>
                        
					</Right>
                </Header>
                
                
                <Content contentContainerStyle={{flex:1,padding: 0, margin:0}}>
				
						<View style={{flex:1}}>	
						
						</View>
						
						<View style={{flex:2}}>	
							<View style={{}}>	
								 <H1 style={{textAlign:'center'}}>Thank you! For Ordering, our executive will reach you to confirm the order.</H1>
								 
							</View>		
							<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',paddingTop:20}}>
								<Button transparent style={{borderRadius: 10,backgroundColor: '#ff9833',width:250,alignItems: 'center', justifyContent:'center'}} 
								   onPress={()=>this.props.navigation.navigate('customerHome',{backRefresh:'yes'})}>
									 <Text style={{fontSize:Platform.OS === 'ios' ?14:14,color:'#ffffff',textAlign:'center'}}>Back to Home</Text>
								</Button>
							</View>
							{/*<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',paddingTop:10}}>
								<Button transparent style={{borderRadius: 10,backgroundColor: '#3ab54a',width:250,alignItems: 'center', justifyContent:'center'}} 
								   onPress={()=>this.onSubmit()}>
									 <Text style={{fontSize:Platform.OS === 'ios' ?14:14,color:'#ffffff',textAlign:'center'}}>Transfer Money</Text>
								</Button>
							</View>*/}
				      </View>
					 <View style={{flex:1}}>	
					 
				     </View>
					
			
                </Content>
		
   
                </Container>
                </StyleProvider>
				</Root>
                );
    }
}