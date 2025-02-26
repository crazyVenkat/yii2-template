import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,Modal } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast, Tab, Tabs, ScrollableTab,Segment } from 'native-base';
import getTheme from '../native-base-theme/components';
import { TextField } from 'react-native-material-textfield';
import material from '../native-base-theme/variables/material';
import { FlatGrid } from 'react-native-super-grid';
import SpinnerScreen from '../screens/SpinnerScreen';

import Carousel from 'react-native-banner-carousel';
import { Font } from 'expo';
import mini from '../assets/logo.png';
var {width, height} = Dimensions.get("window");
var deviceWidth = Dimensions.get("window").width;
import ImageViewer from 'react-native-image-zoom-viewer';
const platform = Platform.OS;
const platformStyle = "material";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
const dimension= Dimensions.get('window');
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
var FirstScreen='Home';

const BannerWidth = 300
const BannerHeight =300;

        const images = [
    "https://salamapps.info/Bigstore/images/categoryImage/1550217530mobile.jpg",
    "https://salamapps.info/Bigstore/images/categoryImage/1550217504Tv.jpeg",
   
];
var BaseUrl="https://timelinemw.com/api/";
export default class Login extends React.Component{
	
	
    static navigationOptions = {
    header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
        Phone: '',
		position: 1,
		quantity: 1,
		zoomIndex:0,
		imageIndex:0,
		fontload:false,
		loggin:true,
		zoomVisible:false,
		isLoading:true,
		langSet:true,
		isNetConnected:true,
		resourceData:[],
		productImage:[],
		zoomImage:[],
		ratings:[],
		CurrencySymbol:'MK',
       
        };
    }
	
  
  componentWillReceiveProps(refresh) {
						 
					this.TotalCart();	
				}
				refresh(){
		
	 // this.setState({ TotalItem:TotalItems	});
  	 // this.setState({ DefaultTotalItem:TotalItems	});
	  console.log("BACK PRESSED");
  }
 
	 componentDidMount(){
		//AsyncStorage.removeItem('CustomerDetails');
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
		this.GetProduct();
		this.TotalCart();
		AsyncStorage.getItem("settingsDetails").then((value) => {
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({countryCode:item.countryCode,CurrencySymbol:item.CurrencySymbol,});
											 
                                           }
                                           else
                                           {
                                             this.setState({nodata:true,isLoading:false});
                                               
                                           }
                                          }).done();
	
								
												 
    }
	 TotalCart() {
	   //console.log(BaseUrl+'totalCart');
	    return fetch(BaseUrl+'totalcart', {credentials: "same-origin",})
      .then((response) => response.json())
      .then((responseTot) => {
       TotalItems=responseTot.sumItems;
        this.setState({
               TotalItem: responseTot.sumItems,
			   DefaultTotalPrice: responseTot.sumPrice,
        });
      })
      .catch((error) => {
        console.error(error);
      });
	   
   }
	componentWillUnmount() {
	  NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
      this.listener && this.listener.remove();
      this.setState( { isMounted: false } )
}

handleConnectivityChange = isNetConnected => {
		console.log('isNetConnected',isNetConnected);
    if (isNetConnected) {
		
      this.setState({ isNetConnected });
    } else {
		//console.log('no');
      this.setState({ isNetConnected });
    }
  };	
	
	
	 
	GetProduct()
	{
		  console.log(BaseUrl+'getproductdetails?Id='+this.props.navigation.state.params.productId);
		      fetch(BaseUrl+'getproductdetails?Id='+this.props.navigation.state.params.productId, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log('productDescription',responseData.productImage);
				  
				  this.setState({resourceData:responseData.result,
				                 productImage:responseData.productImage,
				                 zoomImage:responseData.zoomImage,
				                 ratings:responseData.result.ratings,
								 isLoading:false});
								 
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
						   
	}
	
  
	
  
  
  goBack() {
			const { navigation } = this.props;
			navigation.goBack();
			navigation.state.params.refresh();
		  }	
		  
		     addCart(Id) {
	  //this.getCustomer();
        this.setState({
			isLoading: true,
			ItemId:Id,
            count: this.state.count + 1,
			//Total_price: 199 * (this.state.count+1),
			
			 
        });
	   //if(this.state.Card)
	   if(this.state.loggin)
	   {
		
			 console.log(BaseUrl+'addcart?productIndexId='+Id);
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
						   isLoading: false,
						   //SuccessNotify:true,
						   //Changed:false
						   
					});
					 Toast.show({
                text: 'Product added Successfully!',
                buttonText:'Ok',
                type: "success"
              })
					
					 setTimeout(() => {
						 this.setState({isLoading: false,Changed:true});
						}, 3000);
					
			   }).catch(function(error){
				//console.log(error.message);
			});
			 
	   }
	   else
	   {
		   // AsyncStorage.setItem('PreItem',Id.toString());
		    this.setState({isLoading: false});
		    this.props.navigation.navigate('Login');  
	   }
    
	}
	
 placeCart(Id) {
	  //this.getCustomer();
        this.setState({
			isLoading: true,
			ItemId:Id,
            count: this.state.count + 1,
			//Total_price: 199 * (this.state.count+1),
			
			 
        });
	   //if(this.state.Card)
	   if(this.state.loggin)
	   {
		
			 console.log(BaseUrl+'addcart?productIndexId='+Id);
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
						   isLoading: false,
						   //SuccessNotify:true,
						   //Changed:false
						   
						   
					});
					 Toast.show({
                text: 'Product added Successfully!',
                buttonText:'Ok',
                type: "success"
              })
					
					 setTimeout(() => {
						 this.setState({isLoading: false,Changed:true});
						 this.props.navigation.navigate('checkoutList');  
						}, 3000);
					
			   }).catch(function(error){
				//console.log(error.message);
			});
			 
	   }
	   else
	   {
		   // AsyncStorage.setItem('PreItem',Id.toString());
		    this.setState({isLoading: false});
		    this.props.navigation.navigate('Login');  
	   }
    
	}
	
	 checkoutList(){
	           this.props.navigation.navigate('checkoutList', {refresh: () => this.refresh()}) 
	   }
	
 getZoom(index){
	   console.log(index);
	   this.setState({zoomIndex:index,zoomVisible:true});
   }
renderPage(image, index) {
        return (
            <View key={index} style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
			
			<TouchableOpacity onPress={()=>this.getZoom(index)}>
                <Image style={{ width: BannerWidth, height: BannerHeight,backgroundColor:'#ffffff' }} source={{ uri: image }} />
			</TouchableOpacity>
			
            </View>
        );
    }
	
	
    render() {
        
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
		
		const images = this.state.zoomImage;
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
        
        const { search } = this.state;
		
		var productImage=this.state.productImage;
		var data=this.state.resourceData;
		var ratingsData=this.state.ratings;
		
      
        
        return (
		<Root>
                <StyleProvider style={getTheme(material)}>
            
                <Container style={{backgroundColor:'#ffffff'}}>
				{loaderButton}
					{(this.state.langSet)?
				 <Header style={{height:80,backgroundColor:'#ffffff'}}>
						
				 <Left style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.goBack()}>
							<Icon  style={{fontSize:30, color:'#b71117'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
					<Body style={{flex:2,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):25}}>
					     <Thumbnail square mediam  style={{width:100,height:50}} source={mini} />
					</Body>
					<Right style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					<View style={{flexDirection: 'row'}}>
							<TouchableOpacity onPress={() =>this.props.navigation.navigate('CategoryProductList', {refresh: () => this.refresh()})}>
								<Icon  style={{fontSize: 35, color:'#b71117'}} name='ios-search' />
							</TouchableOpacity>
								</View>
						{ (this.state.TotalItem!==0)?
						<Button transparent onPress={() => this.checkoutList()}>								 								  
								<View style={{flexDirection: 'row'}}>
									<Icon  style={{fontSize: 35, color:'#b71117'}} name='ios-cart' />
									<View style={{ width:24, height:24, paddingTop:0, alignItems:'center', justifyContent:'center',  position:'absolute',left:15,top:1, backgroundColor:'#b71117', borderRadius:20, borderWidth:1, borderColor:'transparent'}}>
										<Text style={{alignItems:'center', justifyContent:'center',color:'#ffffff',fontSize:14,textAlign:'center', backgroundColor:'#b71117'}}>{this.state.TotalItem}</Text>
									</View>
								</View>
						</Button >:
					<Button transparent >								 								  
								<View style={{flexDirection: 'row'}}>
									<Icon  style={{fontSize: 35, color:'#b71117'}} name='ios-cart' />
								</View>
						</Button >}
					</Right>
               
                </Header>:false}
         
			{(this.state.langSet)?<Content>
					
					 <Modal visible={this.state.zoomVisible} animationType="slide" 
					 transparent={true} 
					 onRequestClose={() => this.setState({ zoomVisible: false })}
					 >
					 
                         <ImageViewer imageUrls={images}
						   index={this.state.zoomIndex}
						   onSwipeDown={() => this.setState({ zoomVisible: false })}
						   onCancel={() => this.setState({ zoomVisible: false })}
						   onClick={() => this.setState({ zoomVisible: false })}
						   onChange={(index) =>this.setState({ imageIndex: index ,zoomIndex:index})}
                           enableSwipeDown={true}/>
                     </Modal>
					<View style={{flex: 1,backgroundColor: '#ffffff',justifyContent: 'center',alignItems: 'center',paddingTop:7}}>
                    <Carousel
                    autoplay={true}
                    autoplayTimeout={5000}
                    loop
                    index={this.state.imageIndex}
					//pageIndicatorContainerStyle={{padding:50}}
					activePageIndicatorStyle={{backgroundColor:'#43aa10'}}
                    pageSize={BannerWidth}>
                    {productImage.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>

			{/*<View style={{paddingTop:10}}>
					   <Image style = {{height: 300, width: null, flex: 1,borderRadius:5,backgroundColor:'#ffffff'}} resizeMode="stretch"  source={{uri:data.productImage}}    />
			</View>*/}
					<View style={{padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>			            
							<View style={{flex:1}}>	
								 <Text style={{color:'#000000',fontSize:15,fontWeight:'bold',paddingLeft:10}}>{data.Name}</Text>	
									 {/*<Text note>Department : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{data.Department}</Text></Text>*/}								 
									{(data.Price)?<Text ellipsizeMode='tail' numberOfLines={1} style={{paddingLeft:10,fontSize:15,paddingTop:10,color:'#43aa10'}}>{data.Price}{' '+this.state.CurrencySymbol}</Text>:false}
									{(data.Offer)?<Text style={{fontSize:12,flex:1,color:"#808080",fontWeight:'bold', paddingLeft:10,paddingTop:2}}>Offer Price: {data.Offer}{' '+this.state.CurrencySymbol}</Text>	:false}	
							
							<Text style={{color:'#808080',fontSize:15,fontWeight:'bold',paddingLeft:10,paddingTop:10}}>Delivery Within 7 Working Days</Text>	
							
				<View style={{ flexDirection: "row",flex:1, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
					<Button onPress={() => this.addCart(this.props.navigation.state.params.productId)} iconLeft style={{backgroundColor:'#ff9833',borderRadius: 10,height:50,flex:1}}>
						<Text style={{color:'#ffffff',fontWeight:'bold',paddingLeft:20}}>Add To Cart</Text>
					</Button>
					<View style={{flex:1}}>
					</View>
					<Button iconRight style={{backgroundColor:'#b91015',borderRadius: 10,height:50,flex:1}} onPress={() => this.placeCart(this.props.navigation.state.params.productId)}>
						<Text style={{color:'#ffffff',fontWeight:'bold',paddingLeft:25}}>Order Now</Text>
					</Button>
		        </View>
							</View>	

								
	
							
					</View>
					<Text style={{color:'#000000',fontSize:16,fontWeight:'bold',paddingLeft:10,paddingTop:10}}>Details</Text>
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>	
					
					<Text numberOfLines={10}>
					{data.Description}
					</Text>
					</View>
			
				  
			
			</Content>:false}
			
			{(this.state.isNetConnected==false) ?
                       <Footer style={{backgroundColor:'#000000'}}>
							 <FooterTab style={{flex:4}}>
							 	<View style={{flexDirection:'column', padding:15}}>
								   <Text style={{flex:1, fontSize:15,color:'red',fontWeight:'bold'}}>{(this.state.Language=='Arabic')?'لا اتصال إنترنت':'No Internet Connection'}</Text>
								 </View>
							  </FooterTab>

							 <FooterTab  style={{flex:1, alignItems:'center', justifyContent:'center'}}>
							 	 <Icon  style={{fontSize:30,color:'#ffffff'}} name='ios-close' />							 
							 </FooterTab>
						</Footer>:false}  
			
                </Container>
				
                </StyleProvider>
				</Root>
                );
    }
}