import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,Modal } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast, Tab, Tabs } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';
import logo from '../assets/logo.png';
import mini from '../assets/logo.png';
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

import {BlurView} from 'expo';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
var BaseUrl="https://timelinemw.com/api/";
export default class ordersList extends Component {
	static navigationOptions = {
    header: null ,
	// !!! Hide Header
  }
	constructor(){
				        super();
						this.state = {
						Language:'English',
						isLoading:true,
						isModalVisible:false,
						isModalVisible1:false,
						langSet:true,
						resourceData:[],
						orderDetails:[],
						completedData:[],
						cancelledData:[],
						nodata:'',
						
						}
}
	componentDidMount() {
		AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   //console.log('asyncVal',item.customerIndexId);
                                               this.setState({loggin:true,customerIndexId:item.Id});
											   this.GetProducts(item.Id);
											   this.GetCompleted(item.Id);
											   this.GetCancelled(item.Id);
                                           }
                                           else
                                           {
                                             
                                               this.setState({nodata:true,isLoading:false});
                                           }
                                           //console.log(value);
                                           }).done();
		
		AsyncStorage.getItem("Language").then((Language) => {
                                          if(Language)
                                          {
                                          //console.log(Language);
                                             var lang=(Language)?Language:'English';
                                             this.setState({Language:Language,langSet:true});
                                          
                                          }
                                          else{
                                             this.setState({Language:'English',langSet:true});
                                          }
                                          
                                          
                                          }).done();
		
		}
		
	
		componentWillReceiveProps(refresh) {
		//console.log(refresh.navigation.state.params.orderId);
		
						 this.GetProducts(this.state.customerIndexId);
							
				}
	
	GetProducts(customerIndexId)
	{
		console.log(BaseUrl+'getorders?customerId='+customerIndexId);
		      return fetch(BaseUrl+'getorders?customerId='+customerIndexId, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log('currentOrders',responseData);
				  if(responseData.errorCode==0){
				  this.setState({resourceData:responseData.result});
				  this.setState({isLoading:false});
				  }else{
					  this.setState({nodata:true,isLoading:false});
				  }
                      }).catch(function(error){
                           console.log(error.message);
                           });
	}
	
	GetCompleted(customerIndexId)
	{
		
		      return fetch(BaseUrl+'completed?customerId='+customerIndexId, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  //console.log('completedOrders',responseData);
				  if(responseData.errorCode==0){
				  this.setState({completedData:responseData.result});
				  this.setState({isLoading:false});
				  }else{
					  //this.setState({nodata:true,isLoading:false});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	}
	
	GetCancelled(customerIndexId)
	{
		
		      return fetch(BaseUrl+'cancelled?customerId='+customerIndexId, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                 // console.log('cancelledOrders',responseData);
				  if(responseData.errorCode==0){
				       this.setState({cancelledData:responseData.result});
				       this.setState({isLoading:false});
				  }else{
					  //this.setState({nodata:true,isLoading:false});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	}
	
	cancelOrder()
	{

		    this.setState({isLoading:true});
		
		      return fetch(BaseUrl+'customercancel?customerIndexId='+this.state.customerIndexId+
			                                                                                             '&cancelReason='+this.state.Reason+
			                                                                                             '&comments='+this.state.Comment+
			                                                                                             '&orderIndexId='+this.state.cancelId,{
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log('wish',responseData);
				  this.setState({isLoading:false,cancelId:'',isModalVisible:false});
				  if(responseData.errorCode==0){
					  
					   this.GetProducts(this.state.customerIndexId);
					   this.GetCancelled(this.state.customerIndexId);
				   Toast.show({
                text: 'Order Cancelled!',
                buttonText:'Ok',
                //type: "success"
              })
				  this.setState({isLoading:false,cancelId:''});
				  }else{
					  //this.setState({nodata:true,isLoading:false});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	}
	
	statusOrder(orderId)
	{
			
		      return fetch(BaseUrl+'getorderdatestatus?orderIndexId='+orderId,{
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log('getorderdatestatus',responseData.result);
				
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	}
	
	_toggleModal = (cancelId) =>{
    this.setState({ isModalVisible: !this.state.isModalVisible,cancelId:cancelId });
 }
	_toggleModal1 = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible});
 }
	
	
		
	
  render() {
	    const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const data = this.state.resourceData;
        const completedData = this.state.completedData;
        const cancelledData = this.state.cancelledData;
        const orderDetails = this.state.orderDetails;
		var loaderButton;
        if(this.state.isLoading){
			
            loaderButton =<SpinnerScreen />;
        }
        else{
			
            loaderButton =false;
        }
		let Dropdowndata = [{
			  value: 'Order Placed By mistake ',
			}, {
			  value: 'Item price/shipping price too high',
			}, {
			  value: 'Need to change shipping Address',
			},
			 {
			  value: 'My Reason is not listed',
			}];
	  
    return (
	<Root>
	         <StyleProvider style={getTheme(material)}>
            
                <Container style={{backgroundColor:'#ffffff'}}>
				{loaderButton}
								 
               {(this.state.langSet==true)?
			   <Header style={{height:80,backgroundColor:'#ffffff'}}>
				<StatusBar/>
               	   <Left style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.props.navigation.goBack()}>
							<Icon  style={{fontSize:30, color:'#b71117'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
					<Body style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20,justifyContent:'center',alignItems:'center'}}>
					     <Text style={{color:'#b71117',fontSize:14}}>{(this.state.Language=='Arabic')?'طلباتي':'MY ORDERS'}</Text>
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
					                        
					</Right>
			   </Header>:false}
				
        {(this.state.langSet==true)?<Content style={{backgroundColor:'#ffffff'}}>
	
		
			{data.map((item, index) => {
          return(
		
            <View style={{padding: 5}} key={item.orderId}>
				<Card style={{position: "relative"}}>
				     <CardItem key={item.orderId}>
						  <Body>
						  <View style={{flexDirection:'row'}}>
						      <Text style={{color:'#000000',fontWeight:'bold'}}>{'Order ID'} </Text>
						      <Text style={{color:'#808080',fontSize:14,paddingBottom:5}}>: {item.orderId}</Text>
						  </View>
						  
						  <View style={{flexDirection:'row'}}>
						      <Text style={{flex:1,color:'#000000',fontWeight:'bold'}}>{'Address'} </Text>
						      <Text style={{flex:3,color:'#808080',fontSize:14,paddingBottom:5}}>: {item.deliveryAddress}</Text>
						  </View>
						  
						 
						  
						  <View style={{flexDirection:'row'}}>
						      <Text style={{color:'#000000',fontWeight:'bold'}}>{'Order Status'} </Text>
						      <Text style={{color:'#808080',fontSize:14,paddingBottom:5}}>: {item.CurrentStatus}</Text>
						  </View>
						  
						 <View style={{flexDirection:'row'}}>
						      <Text style={{color:'#000000',fontWeight:'bold'}}>{'Order Type'} </Text>
						      <Text style={{color:'#808080',fontSize:14,paddingBottom:5}}>: {item.OrderType}</Text>
						  </View>
						  
						   <View style={{flexDirection:'row'}}>
						      <Text style={{color:'#000000',fontWeight:'bold'}}>{'Order Date'} </Text>
						      <Text style={{color:'#808080',fontSize:14,paddingBottom:5}}>: {item.bookingDateTime}</Text>
						  </View>
							
						   <View style={{flexDirection:'row'}}>
						      <Text style={{color:'#000000',fontWeight:'bold'}}>{'Total'} </Text>
						      <Text style={{color:'#808080',fontSize:14,paddingBottom:5}}>: {item.totalPrice} MK</Text>
						  </View>
						 <View style={{flexDirection:'row'}}> 
						 <View style={{flex:1}}> 
							<Button transparent style={{borderRadius: 10,backgroundColor: '#fed73c',width:110,height:30}} onPress={()=>this.props.navigation.navigate('order',{orderId:item.orderId,isEdit:'yes'})}>
								   <Text style={{fontSize:Platform.OS === 'ios' ?12:12,color:'#000000',paddingLeft:20}}>{'View Order'}</Text>
								</Button>
							</View>
						
						{/*<View style={{flex:1}}> 
								<Button transparent style={{borderRadius: 10,backgroundColor: 'red',width:80,height:30}} onPress={()=>Alert.alert('Alert','Are you sure want to Cancel this order?',
								[
								{text: 'YES', onPress: () => this._toggleModal(item.orderId), style: 'cancel'},
								{text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

								],
								{ cancelable: false })}>
								   <Text style={{fontSize:Platform.OS === 'ios' ?12:12,color:'white',paddingLeft:20}}>{'Cancel'}</Text>
								</Button>
						</View>*/}
					     </View>
						  </Body>
                      </CardItem>
				</Card>
			</View>
			)
			})
			}
			
			
			
        </Content>:false}
		
		 <Modal visible={this.state.isModalVisible} animationType="slide" onRequestClose={() => null}>
				
				   <View style={{flex:1}}>
				   
				   <View style={{flex:1}}>
				   <List>
						<ListItem >
							<Left>
							
							</Left>
							<Body>
							    <Text style={{fontSize:14,color:'#000000',fontWeight:'bold'}}>Cancel Order</Text>
							</Body>
							<Right>
							<TouchableOpacity  onPress={this._toggleModal1} style={{paddingTop:10}}>
							<Icon style={{color:'#b71117',fontSize:30}} name="ios-close-circle" />
							</TouchableOpacity>
							</Right>
							</ListItem>
				   </List>
				   
				    <View style={{margin:8}}>
									<Dropdown
									label='Select Reason'
									onChangeText={(Reason) => this.setState({Reason:Reason,ReasonError:''})}
									error={this.state.ReasonError}
									data={Dropdowndata}/>
				   </View>
							   
							   <View style={{margin:8}}>
                					<TextField
									value={this.state.Comment}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={(Comment) => this.setState({Comment:Comment,CommentError:''})}
									returnKeyType='next'
									keyboardType='default'
									autoCapitalize='none'
									multiline={true}
									labelHeight={15}
									label={(this.state.Language=='Arabic')?'تعليق':'Comment'}
									textColor='#000000'
									tintColor='#808080'
									baseColor='#808080'
									error={this.state.CommentError}
									/>
                                
                               </View>
							   <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
							        <Button transparent style={{borderRadius: 10,backgroundColor: '#ff9833',width:250,alignItems: 'center', justifyContent:'center'}}  onPress={()=>this.cancelOrder()}>
										<Text style={{fontSize:Platform.OS === 'ios' ?15:15,color:'#000000',textAlign:'center'}}>{(this.state.Language=='Arabic')?'استمر':'CONTINUE'}</Text>
									</Button>
				               </View>
				   </View>
				   
				   <View style={{flex:1}}>
								
                     </View>
					 
                     </View>
				   
			 
			 </Modal>
      </Container>
	  </StyleProvider>
	  </Root>
    );
  }
}