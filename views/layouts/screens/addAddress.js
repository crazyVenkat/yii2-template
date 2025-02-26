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

var baseUrl="https://timelinemw.com/api/";
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
		isModalVisible:false,
        
        };
    }
    
     componentWillReceiveProps(nextProps) {
      
    }
	
	
   
    
    onSubmit() {
          
        var msg='';
        if(!this.state.Comment){
            //this.setState({PhoneError:'Enter the Mobile Number.',isLoading:false});
			return;
        }
     //console.log(baseUrl+'createaddress?Address='+this.state.Comment+'&CustomerId='+this.state.Id);
			this.setState({isLoading:true});
           fetch(baseUrl+'createaddress?Address='+this.state.Comment+'&CustomerId='+this.state.Id, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
            .then((responseData) => {
                 // console.log(responseData);
				 this.setState({ isModalVisible: !this.state.isModalVisible});
                  
                  if(responseData.errorCode==0){
					Toast.show({
					text: 'Address Added successfully!',
					buttonText:'Ok',
					type: "success"
					})
					this.GetAddress(this.state.Id);
					this.setState({isLoading:false});
					
				  }
                  
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
       
        
    }
    
   
    
    
    

   
    componentDidMount()
    {
		AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({loggin:true,Name:item.Name,Id:item.Id});
											   this.GetAddress(item.Id);
											   
											   
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
	GetAddress(Id){
		
		 fetch(baseUrl+'getaddress?id='+Id, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
            .then((responseData) => {
                  console.log(responseData);
                  this.setState({responseData:responseData.result});
                  
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
					<Body style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):25,justifyContent: 'center', alignItems: 'center'}}>
					    <Thumbnail square mediam  style={{width:100,height:50}} source={mini} />
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>				 
                      
					</Right>
					
				</Header>
                
                
                <Content contentContainerStyle={{padding: 0, margin:0}}>
				<Card style={{position: "relative"}}>
				     <CardItem>
					 <Left style={{flex:1}}>
					     <CheckBox onPress={()=>this.SelectHomeAddress()} size={30} checked={this.state.q1_1}/>
						 
					 </Left>
						  <Body style={{flex:2}}>
						      <Text style={{fontSize:13,paddingLeft:10}}>Livingstonia Avenue Next Door To LIMBE mosque, 
Limbe, 
Malawi</Text>
						  </Body>
						  <Right style={{flex:1}}>
						  
						  </Right>
						  
                      </CardItem>
				</Card>    
				{responseData.map((item, index) => {
          return(
				 <View key={item.Id}>
                <Card style={{position: "relative"}} >
				     <CardItem key={item.Id} >
					      <Left style={{flex:1}}>
					          <CheckBox checked={false} onPress={()=>this.SelectAddress(item.Id,item.Address)} size={30} />
					      </Left>
						  <Body style={{flex:2}}>
						    <TouchableOpacity onPress={()=>this.SelectAddress(item.Id,item.Address)}>
						      <Text style={{fontSize:13,paddingLeft:10}}>{item.Address}</Text>
							</TouchableOpacity>
						  </Body>
						  <Right style={{flex:1}}>
						  
						  </Right>
                      </CardItem>
				</Card>    
				
						
				  </View>
				)
			})
			}
				<View style={{flex:1}}>
				<View style={{alignSelf: 'center',paddingTop:10}}>
				<Button transparent style={{borderRadius: 10,backgroundColor: '#fed73c',width:100,height:30}} onPress={()=>this._toggleModal()}>
				<Text style={{fontSize:Platform.OS === 'ios' ?12:12,color:'white',paddingLeft:20}}>Add a Address</Text>
				</Button>
				</View>
				</View>
				
						 <Modal visible={this.state.isModalVisible} animationType="slide" onRequestClose={() => null}>
				
				   <View style={{flex:1}}>
				   
				  
				   <List>
						<ListItem >
							<Left>
							
							</Left>
							<Body>
							    <Text style={{fontSize:14,color:'#000000',fontWeight:'bold'}}>Add Address</Text>
							</Body>
							<Right>
							<TouchableOpacity  onPress={this._toggleModal} style={{paddingTop:10}}>
							<Icon style={{color:'#fed73c',fontSize:30}} name="ios-close-circle" />
							</TouchableOpacity>
							</Right>
							</ListItem>
				   </List>
				   
							   
							   <View style={{margin:8}}>
                					<TextField
									value={this.state.Comment}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={(Comment) => this.setState({Comment:Comment,CommentError:''})}
									returnKeyType='next'
									keyboardType='default'
									//autoCapitalize='none'
									multiline={true}
									labelHeight={15}
									label={'Enter Address'}
									textColor='#000000'
									tintColor='#808080'
									baseColor='#808080'
									error={this.state.CommentError}
									/>
                                
                               </View>
							   <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
							        <Button transparent style={{borderRadius: 10,backgroundColor: '#b71117',width:250,alignItems: 'center', justifyContent:'center'}}  onPress={()=>this.onSubmit()}>
										<Text style={{fontSize:Platform.OS === 'ios' ?15:15,color:'#ffffff',textAlign:'center'}}>Save</Text>
									</Button>
				               </View>
				 
				   
				   <View style={{flex:1}}>
								
                     </View>
					 
                     </View>
				   
			 
			 </Modal>
		
                </Content>
		
   
                </Container>
                </StyleProvider>
				</Root>
                );
    }
}