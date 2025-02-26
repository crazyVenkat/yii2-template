import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Icon, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root, Tab, Tabs } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
var width = Dimensions.get("window").width;
import { FlatGrid } from 'react-native-super-grid';
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

var BaseUrl="https://timelinemw.com/api/getcatalogue";
export default class Sidebar extends Component {
	static navigationOptions = {
    header: null ,
	// !!! Hide Header
  }
	constructor(){
				        super();
						this.state = {
						Language:'English',
						isLoading:true,
						nodata:false,
						TotalItem:0,
						gridProduct:true,
						listProduct:false,
						resourceData:[],
						Phones:[],
						Laptops:[],
						Printers:[],
						Cameras:[],
						CurrencySymbol:'MK',
						wishlistArray:[],
						lat:'',
						lng:'',
						
						}
}
	componentDidMount() {
		console.log(width);
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
		this.GetProducts();
		}
		
	
	GetProducts()
	{
		//console.log('http://salamapps.info/Bigstore/customer/viewproduct?categoryIndexId='+this.props.navigation.state.params.catId+'&subCategoryIndexId='+this.props.navigation.state.params.subCatId);
		      fetch(BaseUrl, {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  console.log(responseData);
				  if(responseData.errorCode==0){
				  this.setState({resourceData:responseData.result,
				  Phones:responseData.Phones,
				  Laptops:responseData.Laptops,
				  Printers:responseData.Printers,
				  Cameras:responseData.Cameras,
				  isLoading:false});
				  }else{
					  this.setState({nodata:true,isLoading:false});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
	}
	

	
	keyExists(element, arr) {
		
		if(arr != null && arr.length >0){
        for(var i=0;i<arr.length;i++){
            if(arr[i] == element)
				//console.log('yes');
                return true;
        }
    }
    return false;
		
	
	//console.log(key in search);
    //return key in search;
}


	
	
	 goBack() {
			const { navigation } = this.props;
			navigation.goBack();
			//navigation.state.params.refresh();
		  }		
  render() {
	  const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const allData = this.state.resourceData;
        const Phones = this.state.Phones;
        const Laptops = this.state.Laptops;
        const Printers = this.state.Printers;
        const Cameras = this.state.Cameras;
		var loaderButton;
        if(this.state.isLoading)
        {
            loaderButton =<SpinnerScreen />;
        }
        else
        {
            loaderButton =false;
        }
	  
    return (<Root>
	         <StyleProvider style={getTheme(material)}>
            
                <Container style={{backgroundColor:'#ffffff'}}>
				{loaderButton}
								 
                <Header style={{height:80,backgroundColor:'#b71117'}}>
				
				<StatusBar/>
               	   <Left style={{flex:1,justifyContent: 'flex-start', alignItems: 'flex-start',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35}}>
				           <TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.goBack()}>
								<Icon  style={{fontSize:30, color:'#ffffff'}} name='ios-arrow-back' />
					       </TouchableOpacity >
					</Left>
					<Body style={{flex:2,justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 0 :0):20}}>
					     <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:14}}>Product Catalogue</Text>
					</Body>
					<Right style={{flex:1,paddingTop:platform === "ios" ? (isIphoneX ? 10 :10):20}}>
						
					</Right>
                </Header>
					
        <Content style={{backgroundColor:'#ffffff'}}>
		{this.state.nodata?
			<View style={{paddingTop:15}}> 
				 <Text style={{textAlign: 'center',color:'#808080',fontSize:13}}>Products unavailable</Text>
			</View>:false}
		<ScrollView>
		<Tabs tabBarUnderlineStyle={{backgroundColor:'#b71117'}}>
          <Tab tabStyle={{backgroundColor:'#f2f2f2'}} activeTextStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} activeTabStyle={{backgroundColor: '#f2f2f2'}} textStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} heading={'All'}>	
{(allData=='')? <View style={{padding:10}}><Text style={{color:'#808080',textAlign:'center'}}>Items Unavailable.</Text></View>:false}       
	   {allData.map((item, index) => { 
		return(
		<View style={{padding: 5}} key={item.Id}>
		<Card>
		<TouchableOpacity   onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id})  }>
		<View style={{paddingTop:2,padding:10}}>
		          <Text>Title : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Title}</Text></Text>
                  <Text note>Department : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Department}</Text></Text>
                  {(item.Price)? <Text note>Price : <Text style={{color:'#808080'}}>{item.Price}{' '+this.state.CurrencySymbol}</Text></Text>:false}
				  </View>
		 
		 <View style={{paddingTop:2,justifyContent: 'center', alignItems: 'center'}}>
					   <Image style = {{height: 150, width: 150, flex: 1,borderRadius:5,backgroundColor:'#ffffff'}} resizeMode="stretch"  source={{uri:item.productImage}}    />
					</View>
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}/>			            
									
				
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>	
					<Text numberOfLines={5}>
					{item.Description}
					</Text>
					</View>
		 
		
		  </TouchableOpacity>
		  </Card>
		  </View>
		  )
			})
			}
			</Tab>	
<Tab tabStyle={{backgroundColor:'#f2f2f2'}} activeTextStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} activeTabStyle={{backgroundColor: '#f2f2f2'}} textStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} heading={'Phones'}>	
{(Phones=='')? <View style={{padding:10}}><Text style={{color:'#808080',textAlign:'center'}}>Items Unavailable.</Text></View>:false}       
	   {Phones.map((item, index) => { 
		return(
		<View style={{padding: 5}} key={item.Id}>
		 <Card>
		<TouchableOpacity   onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id})  }>
		<View style={{paddingTop:2,padding:10}}>
		          <Text>Title : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Title}</Text></Text>
                  <Text note>Department : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Department}</Text></Text>
                 {(item.Price)? <Text note>Price : <Text style={{color:'#808080'}}>{item.Price}{' '+this.state.CurrencySymbol}</Text></Text>:false}
				  </View>
		 
		 <View style={{paddingTop:2,justifyContent: 'center', alignItems: 'center'}}>
					   <Image style = {{height: 150, width: 150, flex: 1,borderRadius:5,backgroundColor:'#ffffff'}} resizeMode="stretch"  source={{uri:item.productImage}}    />
					</View>
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}/>			            
									
				
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>	
					<Text numberOfLines={5}>
					{item.Description}
					</Text>
					</View>
		 
		
		  </TouchableOpacity>
		  </Card>
		  </View>
		  )
			})
			}
			</Tab>

    <Tab tabStyle={{backgroundColor:'#f2f2f2'}} activeTextStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} activeTabStyle={{backgroundColor: '#f2f2f2'}} textStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} heading={'Laptops'}>	
{(Laptops=='')? <View style={{padding:10}}><Text style={{color:'#808080',textAlign:'center'}}>Items Unavailable.</Text></View>:false}       
	   {Laptops.map((item, index) => { 
		return(
		<View style={{padding: 5}} key={item.Id}>
		 <Card>
		<TouchableOpacity   onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id})  }>
		<View style={{paddingTop:2,padding:10}}>
		          <Text>Title : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Title}</Text></Text>
                  <Text note>Department : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Department}</Text></Text>
                 {(item.Price)? <Text note>Price : <Text style={{color:'#808080'}}>{item.Price}{' '+this.state.CurrencySymbol}</Text></Text>:false}
				  </View>
		 
		 <View style={{paddingTop:2,justifyContent: 'center', alignItems: 'center'}}>
					   <Image style = {{height: 150, width: 150, flex: 1,borderRadius:5,backgroundColor:'#ffffff'}} resizeMode="stretch"  source={{uri:item.productImage}}    />
					</View>
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}/>			            
									
				
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>	
					<Text numberOfLines={5}>
					{item.Description}
					</Text>
					</View>
		 
		
		  </TouchableOpacity>
		  </Card>
		  </View>
		  )
			})
			}
			</Tab>
			
			  <Tab tabStyle={{backgroundColor:'#f2f2f2'}} activeTextStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} activeTabStyle={{backgroundColor: '#f2f2f2'}} textStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} heading={'Printers'}>	
        {(Printers=='')? <View style={{padding:10}}><Text style={{color:'#808080',textAlign:'center'}}>Items Unavailable.</Text></View>:false}
		{Printers.map((item, index) => { 
		return(
		<View style={{padding: 5}} key={item.Id}>
		 <Card>
		<TouchableOpacity   onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id})  }>
		<View style={{paddingTop:2,padding:10}}>
		          <Text>Title : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Title}</Text></Text>
                  <Text note>Department : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Department}</Text></Text>
                 {(item.Price)? <Text note>Price : <Text style={{color:'#808080'}}>{item.Price}{' '+this.state.CurrencySymbol}</Text></Text>:false}
				  </View>
		 
		 <View style={{paddingTop:2,justifyContent: 'center', alignItems: 'center'}}>
					   <Image style = {{height: 150, width: 150, flex: 1,borderRadius:5,backgroundColor:'#ffffff'}} resizeMode="stretch"  source={{uri:item.productImage}}    />
					</View>
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}/>			            
									
				
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>	
					<Text numberOfLines={5}>
					{item.Description}
					</Text>
					</View>
		 
		
		  </TouchableOpacity>
		  </Card>
		  </View>
		  )
			})
			}
			</Tab>
			
			 <Tab tabStyle={{backgroundColor:'#f2f2f2'}} activeTextStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} activeTabStyle={{backgroundColor: '#f2f2f2'}} textStyle={{color: '#000000',fontSize:10,fontWeight:'bold'}} heading={'Cameras'}>	
{(Cameras=='')? <View style={{padding:10}}><Text style={{color:'#808080',textAlign:'center'}}>Items Unavailable.</Text></View>:false}       
	   {Cameras.map((item, index) => { 
		return(
		<View style={{padding: 5}} key={item.Id}>
		 <Card>
		<TouchableOpacity   onPress={() => this.props.navigation.navigate('productDetails',{productId:item.Id})  }>
		<View style={{paddingTop:2,padding:10}}>
		          <Text>Title : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Title}</Text></Text>
                  <Text note>Department : <Text style={{color:'#43aa10',fontSize:13,fontWeight:'bold',paddingLeft:2}}>{item.Department}</Text></Text>
                  {(item.Price)? <Text note>Price : <Text style={{color:'#808080'}}>{item.Price}{' '+this.state.CurrencySymbol}</Text></Text>:false}
				  </View>
		 
		 <View style={{paddingTop:2,justifyContent: 'center', alignItems: 'center'}}>
					   <Image style = {{height: 150, width: 150, flex: 1,borderRadius:5,backgroundColor:'#ffffff'}} resizeMode="stretch"  source={{uri:item.productImage}}    />
					</View>
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}/>			            
									
				
					<View style={{flexDirection:'row',padding:10, borderBottomWidth:0.5, borderBottomColor:'#808080'}}>	
					<Text numberOfLines={5}>
					{item.Description}
					</Text>
					</View>
		 
		
		  </TouchableOpacity>
		  </Card>
		  </View>
		 
		  )
			})
			}
			</Tab>
			</Tabs>
			
		  </ScrollView>
        </Content>
      </Container>
	  </StyleProvider>
	  </Root>
    );
  }
}

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
    shadowColor: '#00000021',
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
	borderColor:'#DCDCDC',
	height: 130,
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
    height: 80,
    width: 100,
	paddingBottom:20,
    //borderRadius:60,
    alignSelf:'center',
    borderColor:"#DCDCDC",
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