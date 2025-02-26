import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager,AppRegistry, YellowBox } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast, Tab, Tabs, ScrollableTab  } from 'native-base';
I18nManager.allowRTL(false);
import getTheme from '../native-base-theme/components';
import { TextField } from 'react-native-material-textfield';
import material from '../native-base-theme/variables/material';
import { FlatGrid } from 'react-native-super-grid';
//import Category from 'react-native-category';
import SpinnerScreen from '../screens/SpinnerScreen';
import SideBar from '../customer/Sidebar';
import { NavigationEvents, createDrawerNavigator, DrawerItems, createStackNavigator, createAppContainer, createTabNavigator,DrawerActions } from 'react-navigation';

//import App from "./App";
//import { name as appName } from "./app.json";
//import MapView,{PROVIDER_GOOGLE} from "react-native-maps";

import { Font } from 'expo';
//import logo from '../assets/icon.png';
import mini from '../assets/logo.png';
import shoppingNumber from '../assets/shoppingCart.png';
import shoppingCart from '../assets/shopping-cart.png';
import wishIcon from '../assets/heart-outline.png';
import wishIconAdded from '../assets/hear-innerline.png';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
//import Carousel from 'react-native-banner-carousel';

//import Slideshow from 'react-native-image-slider-show';
var {width, height} = Dimensions.get("window");
var deviceWidth = Dimensions.get("window").width;

const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
const dimension= Dimensions.get('window');
var FirstScreen='Home';
const COUNTRY_LIST = ['IN', 'SA'];
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;
//var BaseUrl="http://salamapps.info/Bigstore/customer/";
var BaseUrl="https://timelinemw.com/api/";
      YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);
	 // AppRegistry.registerComponent(appName, () => App);
	 
export default class Login extends React.Component{
	
	
    static navigationOptions = {
    header: null
    }
    
    constructor(props) {
        super(props);
        
       
        this.state = {
        City:'',   
        Phone: '',
        nodata: false,
		position: 1,
		TotalItem:0,
		fontload:false,
		isLoading:true,
		gridProduct:true,
		listProduct:false,
		isNetConnected:true,
		resourceData:[],
		dealsData:[],
		textSearchArray:[],
		loggin:true,
		wishlistArray:[],
		searchResults:[],
		update:{},
		carouselWidth:dimension.width/2,
		BannerList:[]
       
        };
    }
	  
  
  getCustomer(){
	  
	  AsyncStorage.getItem("CustomerDetails").then((value) => {
                                           console.log('async',value);
                                           if(value)
                                           {
											   const item = JSON.parse(value);
											   this.setState({loggin:true,Name:item.Name,customerId:item.Id});
											  // this.getHome(item.Id);
                                           }
                                           else
                                           {
                                             
                                               
                                           }
                                           //console.log(value);
                                           }).done();
  }


 
	componentDidMount(){
		//AsyncStorage.removeItem('CustomerDetails');
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
		
		this.getCustomer();
		this.GetProducts();
		this.TotalCart();
		
		 setTimeout(() => {
			 this.setState({fontload:true,isLoading:false})
			 
			 }, 500);
											 
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
	
	
	
	GetProducts()
	{
		//console.log('http://salamapps.info/Bigstore/customer/viewproduct?categoryIndexId='+this.props.navigation.state.params.catId+'&subCategoryIndexId='+this.props.navigation.state.params.subCatId);
		      fetch(BaseUrl+'viewall', {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log(responseData);
				  if(responseData.errorCode==0){
				  this.setState({dealsData:responseData.result,
				 // Phones:responseData.Phones,
				  //Laptops:responseData.Laptops,
				  //Printers:responseData.Printers,
				  //Cameras:responseData.Cameras,
				  isLoading:false});
				  }else{
					  this.setState({nodata:true,isLoading:false});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	}
	
	
	
	componentWillReceiveProps(refresh) {
				 this.TotalCart();
						
				}
				
    			
				

	
    signOutNew = () => {
		  
		     AsyncStorage.removeItem('CustomerDetails');
		     this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Login'}]});
		 		
	}
	
	getSubcat(name,id){
		this.props.navigation.navigate('subcategories',{name:name,id:id});
	}
	
	
  
  updateSearch(search) {
	  
	  
	   var deal_array=this.state.dealsData;
	   var Item_array=deal_array;
	   //var text=search;
	   console.log('dealsval',this.state.dealsData);
	   var searchResults=[];
	   for(var key in Item_array) {
		   var productArray=Item_array[key]['productDetails'];
		   var resultVal='';
		   var responseJson=[];
	   for(var val in productArray) {
     	var str1=productArray[val]['productName'];
		//console.log(str1);
		//var str2=Item_array[key]['Portion'];
		//var res = str1.indexOf(text);
			if(str1.toLowerCase().indexOf(search.toLowerCase()) > -1)
			{
				resultVal='yes';
				//console.log(productArray[val]);
				responseJson.push(productArray[val]);
				//responseJson[val]=productArray[val];
			}
		
         }
		 console.log(responseJson.length);
		 if(responseJson.length > 0){
			 
			 //Item_array[key]['productDetails']=responseJson;
		      searchResults.push(Item_array[key]);
			}
		 
		 //console.log(search,resultVal);
	   }
	   
	   console.log(search,searchResults.length);
	   if(searchResults.length > 0)
		  {
			  
			  this.setState({searchResults: searchResults});
			  this.setState({ search:search,nodata:false });
			 // console.log(responseJson);
		  }else
		  {
			  
			  this.setState({searchResults:'',nodata:true}); 
			  this.setState({ search:search });
		  }
		 
		  
		 
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
				  /* var result=responseData.cart;
				   for(var k in result) {
					   if(Id==result[k]['item_id'])
					   {
                           //console.log(result[k]['item_name']);
						   this.setState({FoodName:result[k]['item_name']});
					   }
                     }
				     Checkoutchanged=true;*/
					 
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
                text:'Product added Successfully!',
                buttonText:'Ok',
                type: "success"
              })
					
					 setTimeout(() => {
						 this.setState({isLoading: false,Changed:true});
						}, 3000);
					
			   }).catch(function(error){
				console.log(error.message);
			});
			
			 
	   }
	   else
	   {
		   // AsyncStorage.setItem('PreItem',Id.toString());
		    this.setState({isLoading: false});
		    this.props.navigation.navigate('Login');  
	   }
    
	}

	
	 _renderItem= ({item, index}) => {
			return (
			<View style={{height:this.state.carouselWidth, width:"100%", alignItems:'center', justifyContent:'center', paddingBottom:14, paddingLeft:7, paddingRight:7}}>
			
				  <TouchableHighlight style={{width:"100%", height:"100%", borderRadius:0, position:'absolute'}} onPress={() => this.props.navigation.navigate('Home')  }>
					<View style={{flex:1}}>
					
						<Image style = {{ flex: 1,justifyContent: 'flex-end', borderRadius:10,backgroundColor:'#808080'}}  source = {{uri:item.categoryImage}}    />
						<View style={{height:"100%",width:"100%", backgroundColor: "rgba(0,0,0,0.0)",position: 'absolute', justifyContent: 'center', alignItems:'center', borderRadius: 5}}>
					
						</View>
			
						
					  </View>
			      </TouchableHighlight>		 
				
			  
			</View> );			
		 }  

renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

   refresh()
  {
	  this.setState({ TotalItem:TotalItems	});
  	  this.setState({ DefaultTotalItem:TotalItems	});

	  console.log("BACK PRESSED");
  }	
  

  checkoutList(){
	   this.getCustomer();
	   if(this.state.loggin)
	   {
         this.props.navigation.navigate('checkoutList', {refresh: () => this.refresh()}) 
	   }
	   else
	   {
		    this.setState({isLoading: false});
		    this.props.navigation.navigate('Login');  
	   }
   }
   _renderItem= ({item, index}) => {
			return (
			<View style={{height:this.state.carouselWidth, width:"100%", alignItems:'center', justifyContent:'center', paddingBottom:14, paddingLeft:7, paddingRight:7}}>
			
				  <TouchableHighlight style={{width:"100%", height:"100%", borderRadius:0, position:'absolute'}} onPress={() => this.props.navigation.navigate('Home')  }>
					<View style={{flex:1}}>
					
						<Image style = {{height: 150, width: null, flex: 1,borderRadius:10,backgroundColor:'#808080'}} resizeMode="stretch"  source = {{uri:item.categoryImage}}    />
					
					  </View>
			      </TouchableHighlight>		 
				
			  
			</View> );			
		 }
		drawerclik(){
    this.props.navigation.openDrawer('Home');

  }
		 
    render() {

        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        var homeData = (this.state.searchResults.length>0)?this.state.searchResults:this.state.dealsData;
        //const data =this.state.BannerList ;
        var pro='pro'
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
      
        
        return (
		<Root>
                <StyleProvider style={getTheme(material)}>
            
                <Container style={{backgroundColor:'#ffffff'}}>
				{loaderButton}
                <Header style={{height:80,backgroundColor:'#ffffff'}}>
						
				   <Left style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
					  <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>	
					      <Icon  style={{color:'#b71117',fontSize:30}} name='ios-arrow-back' />
					  </TouchableOpacity>
					</Left>
					<Body style={{flex:2,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):25}}>
					     <Thumbnail square   style={{width:100,height:50}} source={mini} />
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
									<View style={{ width:24, height:24, paddingTop:0, alignItems:'center', justifyContent:'center',  position:'absolute',left:15,top:1, backgroundColor:'#ff6161', borderRadius:20, borderWidth:1, borderColor:'transparent'}}>
										<Text style={{alignItems:'center', justifyContent:'center',color:'#ffffff',fontSize:14,textAlign:'center', backgroundColor:'#ff6161'}}>{this.state.TotalItem}</Text>
									</View>
								</View>
						</Button >:
					<Button transparent >								 								  
								<View style={{flexDirection: 'row'}}>
									<Icon  style={{fontSize: 35, color:'#b71117'}} name='ios-cart' />
								</View>
						</Button >}
					</Right>
               
                </Header>
				<List>
					<ListItem itemDivider>
						<Left>
						   <Text style={{color:'#000000',fontWeight:'bold',fontSize:16}}>Products</Text>
						</Left>
						<Right>
							{(this.state.gridProduct)?
							<TouchableOpacity  onPress={() => this.setState({gridProduct: false,listProduct:true})}>
							   <Icon name="ios-list" style={{fontSize:25,color:'#000000'}}/>
							</TouchableOpacity>:
							<TouchableOpacity  onPress={() => this.setState({gridProduct: true,listProduct:false})}>
							  <Icon name="ios-grid" style={{fontSize:25,color:'#000000'}}/>
							</TouchableOpacity>}
						</Right>
					</ListItem>                    
        		</List>
				
				
			
			<Content>
			{this.state.nodata?
			<View style={{paddingTop:15}}> 
				 <Text style={{textAlign: 'center',color:'#808080',fontSize:13}}>No Results found</Text>
			</View>:false}
			
			
			
			
			{(this.state.nodata==false)?
			
			<View>
			<ScrollView>
         {(this.state.gridProduct)?
								
								<FlatGrid
											itemDimension={130}
											items={this.state.dealsData}
											style={styles.gridView}
											spacing={8}
											initialNumToRender={5}
											renderItem={({ item, index }) => {
											return (
											
											<View style={styles.card}>
											
											<View style={{flex:1,paddingTop:5}}>
													
											            <Text  numberOfLines={1} style={{color:"#b71117",paddingTop:2,paddingLeft:5}}>{item.Category}</Text>
													
													
													{/*(this.keyExists(item.productIndexId,this.state.wishlistArray)==true)?
													<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
														<TouchableOpacity onPress={() => this.checkWish(item.productIndexId)}><Image style={styles.icon} source={wishIconAdded}/></TouchableOpacity>
													
													</View>:
													<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
														<TouchableOpacity onPress={() => this.checkWish(item.productIndexId)}><Image style={styles.icon} source={wishIcon}/></TouchableOpacity>
													</View>
													*/}
												</View>
												
												<TouchableOpacity  onPress={() => this.props.navigation.navigate('productDetails',{refresh: () => this.refresh(),productId:item.Id})  }>
											{/*<Image style={styles.userImage} source={{uri:item.productImage}}/>*/}
											<Thumbnail square  style={styles.userImage} source={{uri:item.productImage}} />
											</TouchableOpacity>
											
												<View style={{flex:1,flexDirection:'row'}}>
													<View style={{flex:3,alignItems:'flex-start', justifyContent:'flex-start'}}>
													<TouchableOpacity  onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id})  }>
														<Text ellipsizeMode='tail' numberOfLines={1} style={{color:"#008080",fontWeight:'bold',paddingLeft:5,paddingTop:2}}>{item.Title}</Text>
											{/*<Text ellipsizeMode='tail' numberOfLines={1} style={{paddingLeft:5,paddingTop:2}}>{item.Description}</Text>*/}
														<Text style={{fontSize:12,flex:1,color:"#000000",fontWeight:'bold', paddingLeft:5,paddingTop:2}}>{(item.Price)?'MK '+item.Price:''}</Text>
													</TouchableOpacity>
													<View style={{paddingTop:2}}>
													</View>
													</View>
													<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
														<TouchableOpacity onPress={() => this.addCart(item.Id)}>
														<Icon style={{color:'#b71117'}} name="ios-cart" /></TouchableOpacity>
													</View>
												</View>
											</View>
											
											
											)
											}}
		 />:
		 <View>
          
		  <List dataArray={this.state.dealsData}  style={{paddingTop:5}} renderRow={(item) =>
		  
		    <ListItem onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id,refresh: () => this.refresh()})  }>
			  <Left style={{flex:1}}>
                <Thumbnail square source={{uri:item.productImage}} />
              </Left>
              <Body style={{flex:2,height:60,padding:10,alignItems:'flex-start', justifyContent:'flex-start'}}>
					<Text  style={{color:'#008080',fontSize:13,fontWeight:'bold',padding:2}}>{item.Category}</Text>					
					<Text numberOfLines={1} style={{color:'#008080',fontSize:13,fontWeight:'bold',padding:2}}>{item.Title}</Text>					
					<Text style={{fontSize:13,color:"#515c6f",fontWeight:'bold',padding:2}}>{(item.Price)?'MK '+item.Price:''}</Text>					
              </Body>
              <Right style={{flex:1}}>
			    <View style={{padding:10}}> 
					 <TouchableOpacity onPress={() => this.addCart(item.Id)}><Icon style={{color:'#b71117',fontSize:25}} name="ios-cart" /></TouchableOpacity>
				</View>
			 </Right>
							</ListItem>}>
							</List>
		 </View>
		 }
								
				</ScrollView>
		
			</View>
			 
		
			:false}
				
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
					<Button vertical onPress={() => this.props.navigation.navigate('invite')  }>
					<Icon style={{color:'#808080'}} name="ios-person-add" />
					<Text>Invite</Text>
					</Button>
					<Button vertical onPress={() => this.props.navigation.navigate('facebook')  }>
					<Icon style={{color:'#808080'}} name="logo-facebook" />
					<Text>FaceBook</Text>
					</Button>
					</FooterTab>
					</Footer>
			
			{(this.state.isNetConnected==false) ?
                       <Footer style={{backgroundColor:'#000000'}}>
							 <FooterTab style={{flex:4}}>
							 	<View style={{flexDirection:'column', padding:15}}>
								   <Text style={{flex:1, fontSize:15,color:'red',fontWeight:'bold'}}>No Internet Connection</Text>
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


const stylesnew = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
	paddingBottom:10
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 130,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
   alignItems:'center'
  },
  /******** card **************/
  card:{
   shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    //elevation: 12,

   // marginVertical: 5,
    backgroundColor:"white",
   // flexBasis: '46%',
   // marginHorizontal: 5,
    borderWidth:0.5,
	borderColor:'#808080',
	borderRadius:5,
	height: 140,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
   // paddingTop: 12.5,
    //paddingBottom: 25,
    //paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage:{
   // height: 80,
    //width: 100,
	//paddingBottom:20,
    //borderRadius:60,
    alignSelf:'center',
   // borderColor:"#DCDCDC",
   //borderWidth:3,
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  icon:{
    height: 20,
    width: 20, 
  }
});     