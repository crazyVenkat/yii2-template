import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,Modal } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast,Icon,CheckBox } from 'native-base';
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
export default class addAddress extends React.Component{
	
	
	
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
    
   
    
    
    

   
    componentDidMount()
    {
		this.Getorder(this.props.navigation.state.params.orderId);
		AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({loggin:true,Name:item.Name,Id:item.Id,mobileNumber:item.Phone});
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
		      fetch(BaseUrl+'uniqueorders?orderIndexId='+orderId, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log('deals',responseData.result.orderDetails);
				  TotalItems=0;
				  this.setState({resourceData:responseData.result.orderDetails,
				  TotalItem: responseData.result.totalItems,
				  TotalPrice: responseData.result.totalPrice,
				  bookingDateTime: responseData.result.bookingDateTime,
				  Address: responseData.result.deliveryAddress,
				  grandTotal: responseData.result.grandTotal,
				  vatAmount: responseData.result.vatAmount,
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
									<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.props.navigation.goBack()}>
									 <Icon  style={{fontSize:30, color:'#b71117'}} name='ios-arrow-back' />
									 </TouchableOpacity >							 
					</Left>
					<Body style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					     <Text style={{color:'#b71117',fontSize:14}}>MY ORDER</Text>
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end',paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					
					</Right>
                </Header>
                                
                <Content contentContainerStyle={{padding: 0, margin:0}}>
				 <View style={{paddingTop:5}}>
				<View style={{ flexDirection: 'row',backgroundColor:'#ffffff',height:30}}>
						<View style={{flex:1}}>	
							 <Text  style={{fontSize:14,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>Order ID</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>{this.state.orderRandId}</Text>
						</View>
						
				</View>
		    </View>
			 <View style={{paddingTop:5}}>
				<View style={{ flexDirection: 'row',backgroundColor:'#ffffff',height:30}}>
						<View style={{flex:1}}>	
							 <Text  style={{fontSize:14,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>Address</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>{(this.state.placeAddress)?this.state.placeAddress:this.state.Address}</Text>
						</View>
						
				</View>
		    </View>
	
		
			<View style={{paddingTop:5}}>
				<View style={{ flexDirection: 'row',backgroundColor:'#ffffff',height:30}}>
						<View style={{flex:1}}>	
							 <Text  style={{fontSize:14,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>Mobile Number</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>{this.state.countryCode} {this.state.mobileNumber}</Text>
						</View>
						
				</View>
		    </View>
			
		<ScrollView>
          {(this.state.resourceData)?
		<View>
          
		     <List dataArray={data}   
			 renderRow={(item) =>
							<ListItem>
								  <Left style={{flex:1}}>
									<Thumbnail square  source={{uri:item.productImage}} />
								  </Left>
								  <Body style={{flex:2,padding:5}}>
										<Text numberOfLines={1}style={{color:'#43aa10',fontSize:13,fontWeight:'bold',padding:2}}>{item.productName}</Text>					
										<Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:13,padding:2}}>{item.productDescription}</Text>
										<Text style={{fontSize:13,color:"#515c6f",fontWeight:'bold',padding:2}}>SAR {item.productPrice}</Text>					
								  </Body>
								  <Right style={{flex:1}}>
										<Text style={{fontSize:13,color:"#515c6f",fontWeight:'bold',padding:2}}>{item.quantity}</Text>
								  </Right>
							</ListItem>}>
			</List>
		  
		  <View style={{paddingTop:5}}>
				<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>	
							 <Text style={{alignSelf:'center',fontSize:14,color:"#808080",paddingLeft:15,paddingTop:10}}>Total Quantity</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#000000",paddingLeft:15,paddingTop:10}}>{this.state.TotalItem}</Text>
						</View>
				</View>
		    </View>
		  
		    <View style={{paddingTop:5}}>
				<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>	
							 <Text style={{alignSelf:'center',fontSize:14,color:"#808080",paddingLeft:15,paddingTop:10}}>Total Price</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#43aa10",paddingLeft:15,paddingTop:5}}> {this.state.TotalPrice} MK</Text>
						</View>
				</View>
		    </View>
			
	
		  
		  </View>:false}
		  
		  
							
		  </ScrollView>
		
                </Content>
		
   
                </Container>
                </StyleProvider>
				</Root>
                );
    }
}