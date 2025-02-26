import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,Modal } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';
import CodePin from 'react-native-pin-code';
import logo from '../assets/logo.png';
import mini from '../assets/logo.png';
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
import wishIcon from '../assets/hear-innerline.png';
import editIcon from '../assets/edit.png';
import {BlurView} from 'expo';
const {height, width} = Dimensions.get('window');
var BaseUrl="https://timelinemw.com/api/";
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

export default class checkoutList extends Component {
	static navigationOptions = {
    header: null ,
	// !!! Hide Header
  }
	constructor(){
				        super();
						this.state = {
						Language:'English',
						type:'Pickup',
						isEdit:'',
						isLoading:true,
						langSet:false,
						isBookingVisible:false,
						payType:1,
						resourceData:[],
						pickList:[],
						lat:'',
						lng:'',
						HomeNumber:'',
						Street:'',
						Area:'',
						City:'',
						Landmark:'',
						displayCodePin:'',
						Address:'Livingstonia Avenue Next Door To LIMBE mosque,Limbe,Malawi',
						countryCode:'+265'
						}
						
}
	componentDidMount() {
		this.PickupList();
		AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   console.log('asyncVal',item);
                                               this.setState({loggin:true,Name:item.Name,customerId:item.Id,mobileNumber:item.Phone});
											   this.TotalCart();
											   //this.getAddress();
											   //this.getProfile(item.customerIndexId)
                                           }
                                           else
                                           {
                                             
                                           }
                                           //console.log(value);
                                           }).done();
		
		AsyncStorage.getItem("Language").then((Language) => {
                                          if(Language)
                                          {
                                          console.log(Language);
                                          var lang=(Language)?Language:'English';
                                          this.setState({Language:Language,langSet:true});
                                          
                                          }
                                          else{
                                          this.setState({Language:'English',langSet:true});
                                          }
                                          
                                          
                                          }).done();
										  
		return fetch(BaseUrl+'getcountrycode', {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
            .then((responseData) => {
                  //console.log(responseData);

                  if(responseData.errorCode==0){
					 this.setState({countryCode:responseData.countryCode});
                  
                  }else{
                  this.setState({PhoneError:responseData.message,isLoading:false});
                  }
                  
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
		
		}
		
	
		
		
	
		 TotalCart() {
				console.log(BaseUrl+'totalCart');
				return fetch(BaseUrl+'totalcart', {credentials: "same-origin",})
				.then((response) => response.json())
				.then((responseTot) => {
				console.log('Total',responseTot);
				TotalItems=responseTot.sumItems;
				this.setState({
				   TotalItem: responseTot.sumItems,
				   resourceData: responseTot.cart,
				   DefaultTotalPrice: responseTot.sumPrice,
				   TotalPrice: responseTot.sumPrice,
				   grandTotal: responseTot.grandTotal,
				   vatAmount: responseTot.vatAmount,
				   isLoading:false
				});
				})
				.catch((error) => {
				console.error(error);
				});
	   
		 }
		 PickupList() {
				//console.log(BaseUrl+'totalCart');
				return fetch(BaseUrl+'pickuplist', {credentials: "same-origin",})
				.then((response) => response.json())
				.then((responseTot) => {
			     if(responseTot.errorCode==0){
					 this.setState({pickList:responseTot.result});
                  
                  }
				})
				.catch((error) => {
				console.error(error);
				});
	   
		 }
		 
		 
   minusCart(Id) {
	  
        this.setState({
			isLoading: true,
			ItemId:Id,
            count: this.state.count + 1,
			//Total_price: 199 * (this.state.count+1),
			
			 
        });
	  
			 fetch(BaseUrl+'removecart?productIndexId='+Id, {
			  method: "GET",
			  credentials: "same-origin",			  
			  headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			  } 
			
			}).then((response) => response.json())
			   .then((responseData) => {
				   console.log(responseData);
				  				 
					 TotalItems=responseData.sumItems;
					 if(responseData.errorCode==0){
				   this.setState({
						   TotalItem: responseData.sumItems,
						   DefaultTotalItem: responseData.sumItems,
						   TotalPrice: responseData.sumPrice,
						   grandTotal: responseData.grandTotal,
				           vatAmount: responseData.vatAmount,
						   resourceData: responseData.cart,
						   isLoading: false,
						   //SuccessNotify:true,
						   //Changed:false
						   
					});
					 }else if(responseData.errorCode==2){
						 TotalItems=0;
						 this.goBack();
					 }
					
			   }).catch(function(error){
				//console.log(error.message);
			});
			 
	   
	}
   
    addCart(Id) {
	  
        this.setState({
			isLoading: true,
			ItemId:Id,
            count: this.state.count + 1,
			//Total_price: 199 * (this.state.count+1),
		 
        });
	 
			 fetch(BaseUrl+'addcart?productIndexId='+Id, {
			  method: "GET",
			  credentials: "same-origin",			  
			  headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			  } 
			
			}).then((response) => response.json())
			   .then((responseData) => {
				   console.log(responseData);
				 			 
					 TotalItems=responseData.sumItems;
				   this.setState({
						   TotalItem: responseData.sumItems,
						   DefaultTotalItem: responseData.sumItems,
						   TotalPrice: responseData.sumPrice,
						   grandTotal: responseData.grandTotal,
				           vatAmount: responseData.vatAmount,
						   resourceData: responseData.cart,
						   isLoading: false,
						   
						   
					});
					 
					
					
			   }).catch(function(error){
				//console.log(error.message);
			});
			 
	   
    
	}
	
	  removeCart(Id) {
	  console.log(Id);
        this.setState({	isLoading: true,});
	  
			 fetch(BaseUrl+'removeuniquecart?row_id='+Id, {
			  method: "GET",
			  credentials: "same-origin",			  
			  headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			  } 
			
			}).then((response) => response.json())
			   .then((responseData) => {
				   console.log(responseData);
				  				 
					 TotalItems=responseData.sumItems;
					 if(responseData.sumItems!=0){
				   this.setState({
						   TotalItem: responseData.sumItems,
						   DefaultTotalItem: responseData.sumItems,
						   TotalPrice: responseData.sumPrice,
						   grandTotal: responseData.grandTotal,
				           vatAmount: responseData.vatAmount,
						   resourceData: responseData.cart,
						   isLoading: false,
						   //SuccessNotify:true,
						   //Changed:false
						   
					});
					 }else{
						// this.goBack();
						 this.props.navigation.navigate('Home', {refresh: () => this.refresh()})
					 }
					
					
					
			   }).catch(function(error){
				//console.log(error.message);
			});
			 
	   
	}
   refresh()
  {
	  this.setState({ TotalItem:TotalItems	});
  	  this.setState({ DefaultTotalItem:TotalItems	});
	  console.log("BACK PRESSED");
  }
  
  goBack() {
			const { navigation } = this.props;
			navigation.goBack();
			navigation.state.params.refresh();
		  }	

OtpSuccess=()=>	{
		
		this.setState({isLoading:true});
		this.setState({OTPerrors:''}); 
		this.onSubmit();
		
			
		  
	}		  
		  
onSubmit() {
	  
          
	       var Address=this.state.Address;
		   if(Address==''){
			Alert.alert('Alert','Please enter your Delivery Address',
											[
											{text: 'OK', style: 'cancel'},
											
											],
											{ cancelable: false });
		 return false;									
			
		}
		 this.setState({isLoading: true});
		 console.log(BaseUrl+'placeorder?customerId='+this.state.customerId+
			                            '&deliveryAddress='+Address+
			                            '&HomeNumber='+this.state.HomeNumber+
			                            '&Street='+this.state.Street+
			                            '&City='+this.state.City+
			                            '&Area='+this.state.Area+
			                            '&Landmark='+this.state.Landmark+
										'&delType='+this.state.type);
	       
			 fetch(BaseUrl+'placeorder?customerId='+this.state.customerId+
			                            '&deliveryAddress='+Address+
			                            '&HomeNumber='+this.state.HomeNumber+
			                            '&Street='+this.state.Street+
			                            '&City='+this.state.City+
			                            '&Area='+this.state.Area+
			                            '&Landmark='+this.state.Landmark+
										'&delType='+this.state.type, {
			  method: "GET",
			  credentials: "same-origin",			  
			  headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			  } 
			
			}).then((response) => response.json())
			   .then((responseData) => {
				   console.log(responseData);
				 	 TotalItems=0;
				   this.setState({isLoading: false});
				 Toast.show({
                text: 'Order Placed Successfully!',
                buttonText:'Ok',
                type: "success"
              });
			   setTimeout(() => {
						  this.props.navigation.navigate('Placeorder',{refresh: () => this.refresh(),orderId:responseData.orderId});
						}, 1000);
			    
				
				
				
					
			   }).catch(function(error){
				console.log(error.message);
			});
			 
	   
    
	}
	

	
	
	componentWillReceiveProps(refresh){
	// console.log(refresh.navigation.state.params.address);
	 this.setState({Address:refresh.navigation.state.params.address,getAddress:refresh.navigation.state.params.address})
	 //this.getAddress();
  }
  
	changeType(type){
		if(type=='Pickup'){
		    this.setState({Address:'Livingstonia Avenue Next Door To LIMBE mosque,Limbe,Malawi',isEdit:false,getAddress:'',type:type});
		}else{
			this.setState({Address:'',isEdit:true,type:type});
		}
	}
	
	saveDel(){
		this.setState({getAddress:this.state.delAddress,Address:this.state.delAddress,isBookingVisible:false})
	}
	
  render() {
	  const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const data = this.state.resourceData;
        const pickList = this.state.pickList;
		var loaderButton;
        if(this.state.isLoading)
        {
            loaderButton =<SpinnerScreen />;
        }
        else
        {
            loaderButton =false;
        }
		let Deliverydata = [{
      value: 'Pickup',
    }, {
      value: 'Delivery',
    }];
	  
    return (
	
	<Root>
	
	        <StyleProvider style={getTheme(material)}>
            
                <Container style={{backgroundColor:'#ffffff'}}>
				{loaderButton}
								 
			<Header style={{height:80,backgroundColor:'#ffffff'}}>
				
				<StatusBar/>
               	   	<Left style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.goBack()}>
							<Icon  style={{fontSize:30, color:'#b71117'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
					<Body style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20,justifyContent:"center",alignItems:"center"}}>
					     <Text style={{color:'#b71117',fontSize:14}}>MY CART</Text>
					</Body>
					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
					    
					</Right>
			</Header>
				{this.state.displayCodePin ? <Content contentContainerStyle={{flex: 1}} style={{paddingTop: 10}}>
							<View>
							<Text style={{textAlign:'center',fontSize:15}}>Kindly Check your email and Enter the OTP</Text>
							</View>
							<View style={{alignItems: 'center'}}>
							<CodePin
										number={4} // You must pass number prop, it will be used to display 4 (here) inputs
										//checkPinCode={(code, callback) => callback(code === '1234')}
										code={this.state.otp.toString()}
										success={() => this.OtpSuccess()} // If user fill '2018', success is called
										text="" // My title
										error="Please enter valied otp" // If user fail (fill '2017' for instance)
										autoFocusFirst={true} // disabling auto-focus
										textStyle={{ textAlign: 'center', color: 'gray', fontSize: 20, marginTop: 10}}
										keyboardType="numeric"
										containerStyle={{backgroundColor:'rgba(0,0,0,0)',borderRadius:10}}
										containerPinStyle={{ height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20,backgroundColor: 'rgba(0,0,0,0)' }}
										pinStyle={{ backgroundColor : '#43aa10', color:'#ffffff', width:40, height:40, textAlign: 'center', marginLeft: 10, marginRight: 10, borderRadius: 1, shadowColor: '#808080', shadowOffset: {width: 1,height : 1}, shadowRadius: 5, shadowOpacity : 0.4 }}
										/>
										</View>
								
								  
				</Content>:false}
        {(this.state.langSet==true)?
		(this.state.displayCodePin==false)?
		<Content style={{backgroundColor:'#ffffff'}}>
	
	{/*<View style={{paddingTop:5}}>
			<View style={{ flexDirection: 'row',backgroundColor:'#fed73c',height:60}}>
						<View style={{flex:1}}>	
							<View style={{flexDirection:'row'}}>	
								  <Icon  style={{fontSize:20, color:'#4d4b4c',paddingLeft:5,paddingTop:10}} name='ios-pin' />
								 <Text  style={{fontSize:12,color:"#4d4b4c",paddingLeft:15,paddingTop:10}}>Delivery Address</Text>
							</View>		
						</View>		
						<View style={{flex:2}}>
							 <TouchableOpacity onPress={() => this.props.navigation.navigate('addAddress')}>
							      <Text style={{fontSize:12,color:"#4d4b4c",paddingTop:10}}>{(this.state.placeAddress)?this.state.placeAddress:this.state.Address}</Text>
							 </TouchableOpacity>
						</View>
						<View style={{alignItems:'center',justifyContent:'center'}}>
							<View style={{paddingRight:5}}>
								
									<TouchableOpacity onPress={() => this.props.navigation.navigate('addAddress')}>
									<Icon  style={{fontSize:20,color:'#4d4b4c'}} name='ios-create' />
									</TouchableOpacity>
							
							</View>
						</View>
				</View>
	</View>*/}
	     
			<View style={{paddingTop:5}}>
				<View style={{ flexDirection: 'row',backgroundColor:'#ffffff',height:30}}>
						<View style={{flex:1}}>	
							 <Text  style={{fontSize:14,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>Name</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#4d4b4c",paddingLeft:15,paddingTop:5}}>{this.state.Name}</Text>
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
          
		     <List dataArray={data}   renderRow={(item) =>
							<ListItem>
								  <Left style={{flex:1}}>
									<Thumbnail square  source={{uri:item.productImage}} />
								  </Left>
								  <Body style={{flex:2,padding:5}}>
										<Text numberOfLines={1} style={{color:'#008080',fontSize:13,fontWeight:'bold',padding:2}}>{item.productName}</Text>					
										<Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:13,padding:2}}>{item.productDescription}</Text>
										<Text style={{fontSize:13,color:"#515c6f",fontWeight:'bold',padding:2}}>MK {item.productPrice}</Text>					
								  </Body>
								  <Right style={{flex:1}}>
										 <TouchableOpacity   onPress={()=>Alert.alert('Warning','Are you sure want to Remove this item?',
											[
											{text: 'YES', onPress: () => this.removeCart(item.row_id), style: 'cancel'},
											{text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

											],
											{ cancelable: false })}>
											<Icon name="ios-trash" style={{color:'#4d4b4c',fontSize:25}} />
											</TouchableOpacity>
										 <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center',paddingTop:10,paddingLeft:30}}>
									<View style={{justifyContent: 'flex-start', alignItems: 'flex-start',paddingRight:10}} >
										<TouchableOpacity onPress={() => this.addCart(item.productIndexId)}>
											<Icon name="ios-add-circle-outline" style={{color:'#4d4b4c',fontSize:25}} />
										</TouchableOpacity >
									</View>
									<View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#b71117',width:20}}>
										<Text style={{fontSize:18, marginBottom:3,color:'#ffffff'}}>{item.quantity}</Text>
									</View>
									<View style={{justifyContent: 'flex-end', alignItems: 'flex-end',paddingLeft:10}}>
										<TouchableOpacity onPress={() => this.minusCart(item.productIndexId)}>
											<Icon name="ios-remove-circle-outline" style={{color:'#4d4b4c',fontSize:25}} />
										</TouchableOpacity>
									</View>	
									
							   </View>	
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
		  
		   
			
					
			 <View style={{}}>
				<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>	
							 <Text style={{alignSelf:'center',fontSize:14,color:"#808080",paddingLeft:15,paddingTop:5}}>Shipping Fees</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#000000",paddingLeft:15,paddingTop:5}}>Free</Text>
						</View>
				</View>
		    </View>
			
			
			 <View style={{paddingTop:5}}>
				<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>	
							 <Text style={{alignSelf:'center',fontSize:14,color:"#808080",paddingLeft:15,paddingTop:10}}>Total</Text>
						</View>		
						<View style={{flex:1}}>
							 <Text style={{fontSize:13,color:"#000000",paddingLeft:15,paddingTop:10,fontWeight:'bold'}}>MK {this.state.TotalPrice}</Text>
						</View>
				</View>
		    </View>
			
			<View style={{}}>
				<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>	
							 <Text style={{alignSelf:'center',fontSize:14,color:"#808080",paddingLeft:15,paddingTop:35}}>Delivery Type</Text>
						</View>		
						<View style={{flex:1,paddingTop:10}}>
						<Dropdown
						label=''
						placeholder={'Select'}
						value={this.state.type}
						containerStyle={{backgroundColor:'#ffffff',borderRadius:8,height:45,borderColor:'#000000'}}
						labelTextStyle={{paddingLeft:10}}
						inputContainerStyle={{paddingLeft:15}}
						labelHeight={12}
						onChangeText={(type) => this.changeType(type)}
						//textColor='#ffffff'
						//itemColor='#ffffff'
						tintColor='#fea501'
						baseColor='#000000'
						lineWidth={0}
						itemCount={5}
						animationDuration={0}
						activeLineWidth={0}
						data={Deliverydata}
						
						/>
							
						
						{/*<Picker
					selectedValue={this.state.payType}
					style={{height:95, width: 150}}
					itemStyle={{fontSize:12, height:95, color: "#43aa10"}}
					onValueChange={(itemValue, itemIndex) => this.setState({payType: itemValue})}>
					<Picker.Item label = {"Pick up"} value = "1" />
                    <Picker.Item label = {"Delivery"} value = "2" />
						</Picker>*/}
						</View>
				</View>
		    </View>
			 <View style={{paddingTop:5}}>
				<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>	
							 <Text style={{alignSelf:'center',fontSize:14,color:"#000000",paddingLeft:15,paddingTop:10}}>Delivery Address</Text>
						</View>		
						<View style={{flex:1}}>
							 {(this.state.isEdit=='')?
							 <Dropdown
						label=''
						placeholder={'Select'}
						value={this.state.Address}
						containerStyle={{backgroundColor:'#ffffff',borderRadius:8,height:30,borderColor:'#000000',borderWidth:0.5}}
						labelTextStyle={{paddingLeft:20}}
						inputContainerStyle={{paddingLeft:5}}
						labelHeight={5}
						fontSize={10}
						onChangeText={(Address) => this.setState({Address:Address})}
						tintColor='#fea501'
						baseColor='#000000'
						lineWidth={0}
						itemCount={5}
						animationDuration={0}
						activeLineWidth={0}
						data={pickList}
						/>
							 :false}
								 {(this.state.isEdit)?
								 <TouchableOpacity onPress={()=>this.setState({isBookingVisible:true})}>
									 {(this.state.getAddress)?
									 <Text  style={{fontSize:13,color:"#000000",paddingLeft:15,paddingTop:10,fontWeight:'bold'}}>{this.state.getAddress}</Text>:false}
							    <Text  style={{fontSize:13,color:"#43aa10",paddingLeft:15,paddingTop:10,fontWeight:'bold'}}>Add Address</Text>
								 </TouchableOpacity>:false}
						</View>
				</View>
		    </View>
			
			
			  
				<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',paddingTop:20}}>
					<Button transparent style={{borderRadius: 10,backgroundColor: '#b71117',width:250,alignItems: 'center', justifyContent:'center'}} 
					onPress={()=>this.onSubmit()}>
					     <Text style={{fontSize:Platform.OS === 'ios' ?14:14,color:'#ffffff',textAlign:'center'}}>PLACE ORDER</Text>
					</Button>
			  </View>
		  
		  
		  </View>:false}
		  
		  
							
		  </ScrollView>
		  
	
  </Content>:false:false}
  <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isBookingVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
         <ScrollView>
			
			<View style={{
          flex: 1,
		  
          flexDirection: 'column',
          //justifyContent: 'center',
          alignItems: 'center',
		 }}>
    <View style={{
            width:350,
			margin:12,
            height: 600, backgroundColor:'#ffffff',borderRadius:10,borderColor: "#b71117",borderWidth:3}}>
				   <List>
						<ListItem >
							<Left style={{flex:1}}>
							   
							</Left>
							<Body style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
							    <Text style={{fontSize:15,color:'#000000',fontWeight:'bold'}}>Add Address</Text>
							   							</Body>
							<Right style={{flex:1}}>
								<TouchableOpacity  onPress={()=>this.setState({isBookingVisible:false})} style={{}}>
								     <Icon style={{color:'#b71117',fontSize:30}} name="ios-close-circle" />
								</TouchableOpacity>
							</Right>
						</ListItem>
				   </List>
				  
						
                        <View style={{paddingTop:5,margin:12}}>						
							 <TextField
								value={this.state.delAddress}
								onChangeText={(delAddress) => this.setState({delAddress:delAddress})}
								//keyboardType='numeric'
								maxLength={12} 
								placeholder={'Please Enter Your Address'}
								containerStyle={{backgroundColor:'#f8faf8',borderRadius:8,height:60,borderColor:'#808080',borderWidth:1}}
								labelTextStyle={{paddingLeft:10}}
								inputContainerStyle={{paddingLeft:15}}
								labelHeight={10}
								//label={(this.state.Language=='Arabic')?'أدخل رقم هاتفك المحمول':'Enter Your Mobile Number'}
								label=''
								multiline={true}
								textColor='#000000'
								tintColor='#000000'
								baseColor='#000000'
								placeholderTextColor='#000000'
								lineWidth={0}
								activeLineWidth={0}
								error={this.state.delAddressError}
								autoCapitalize='none'
								/>
					
						</View>
				   				   
				  	
						
                        <View style={{paddingTop:5,margin:12}}>						
							 <TextField
								value={this.state.HomeNumber}
								onChangeText={(HomeNumber) => this.setState({HomeNumber:HomeNumber,PhoneError:''})}
								//keyboardType='numeric'
								maxLength={12} 
								placeholder={'Please Enter Your Home Number'}
								containerStyle={{backgroundColor:'#f8faf8',borderRadius:8,height:40,borderColor:'#808080',borderWidth:1}}
								labelTextStyle={{paddingLeft:10}}
								inputContainerStyle={{paddingLeft:15}}
								labelHeight={5}
								//label={(this.state.Language=='Arabic')?'أدخل رقم هاتفك المحمول':'Enter Your Mobile Number'}
								label=''
								textColor='#000000'
								tintColor='#000000'
								baseColor='#000000'
								placeholderTextColor='#000000'
								lineWidth={0}
								activeLineWidth={0}
								error={this.state.HomeNumberError}
								autoCapitalize='none'
								/>
					
				</View>
				<View style={{margin:12}}>						
							 <TextField
								value={this.state.City}
								onChangeText={(City) => this.setState({City:City})}
								//keyboardType='numeric'
								maxLength={12} 
								placeholder={'Please Enter Your City'}
								containerStyle={{backgroundColor:'#f8faf8',borderRadius:8,height:40,borderColor:'#808080',borderWidth:1}}
								labelTextStyle={{paddingLeft:10}}
								inputContainerStyle={{paddingLeft:15}}
								labelHeight={5}
								//label={(this.state.Language=='Arabic')?'أدخل رقم هاتفك المحمول':'Enter Your Mobile Number'}
								label=''
								textColor='#000000'
								tintColor='#000000'
								baseColor='#000000'
								placeholderTextColor='#000000'
								lineWidth={0}
								activeLineWidth={0}
								error={this.state.CityError}
								autoCapitalize='none'
								/>
					
						</View>
				
			              <View style={{paddingTop:5,margin:12}}>						
							 <TextField
								value={this.state.Area}
								onChangeText={(Area) => this.setState({Area:Area})}
								//keyboardType='numeric'
								maxLength={12} 
								placeholder={'Please Enter Your Area'}
								containerStyle={{backgroundColor:'#f8faf8',borderRadius:8,height:40,borderColor:'#808080',borderWidth:1}}
								labelTextStyle={{paddingLeft:10}}
								inputContainerStyle={{paddingLeft:15}}
								labelHeight={5}
								//label={(this.state.Language=='Arabic')?'أدخل رقم هاتفك المحمول':'Enter Your Mobile Number'}
								label=''
								textColor='#000000'
								tintColor='#000000'
								baseColor='#000000'
								placeholderTextColor='#000000'
								lineWidth={0}
								activeLineWidth={0}
								error={this.state.HomeNumberError}
								autoCapitalize='none'
								/>
					
						</View>
				
			            <View style={{paddingTop:5,margin:12}}>						
							 <TextField
								value={this.state.Street}
								onChangeText={(Street) => this.setState({Street:Street})}
								//keyboardType='numeric'
								maxLength={12} 
								placeholder={'Please Enter Your Street'}
								containerStyle={{backgroundColor:'#f8faf8',borderRadius:8,height:40,borderColor:'#808080',borderWidth:1}}
								labelTextStyle={{paddingLeft:10}}
								inputContainerStyle={{paddingLeft:15}}
								labelHeight={5}
								//label={(this.state.Language=='Arabic')?'أدخل رقم هاتفك المحمول':'Enter Your Mobile Number'}
								label=''
								textColor='#000000'
								tintColor='#000000'
								baseColor='#000000'
								placeholderTextColor='#000000'
								lineWidth={0}
								activeLineWidth={0}
								error={this.state.StreetError}
								autoCapitalize='none'
								/>
					
						</View>
			
			
                        <View style={{paddingTop:10,margin:12}}>						
							 <TextField
								value={this.state.Landmark}
								onChangeText={(Landmark) => this.setState({Landmark:Landmark})}
								//keyboardType='numeric'
								maxLength={12} 
								placeholder={'Please Enter The Landmark'}
								containerStyle={{backgroundColor:'#f8faf8',borderRadius:8,height:40,borderColor:'#808080',borderWidth:1}}
								labelTextStyle={{paddingLeft:10}}
								inputContainerStyle={{paddingLeft:15}}
								labelHeight={5}
								//label={(this.state.Language=='Arabic')?'أدخل رقم هاتفك المحمول':'Enter Your Mobile Number'}
								label=''
								textColor='#000000'
								tintColor='#000000'
								baseColor='#000000'
								placeholderTextColor='#000000'
								lineWidth={0}
								activeLineWidth={0}
								error={this.state.LandmarkError}
								autoCapitalize='none'
								/>
					
						
						</View>
						<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',paddingTop:10}}>
					<Button transparent style={{borderRadius: 10,backgroundColor: '#b71117',width:250,alignItems: 'center', justifyContent:'center'}} 
					onPress={()=>this.saveDel()}>
					     <Text style={{fontSize:Platform.OS === 'ios' ?14:14,color:'#ffffff',textAlign:'center'}}>Save Address</Text>
					</Button>
				</View>
				
		  </View>
		  </View>
		  </ScrollView>
        </Modal>
      </Container>
	  </StyleProvider>
	  </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  blur: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: width,
    height: height
  },
  avoidingView: {
    borderRadius: 10,
    height: 150,
    width: width - 30
  },
  containerCodePin: {
    borderRadius: 10
  },
  pinStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  success: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center'
  }
});