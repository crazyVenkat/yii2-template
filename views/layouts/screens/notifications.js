import React from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, TextInput, View, Alert,Image, Platform,Dimensions,ScrollView, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,AsyncStorage,NavigationActions,Linking,NetInfo,Keyboard,StatusBar,Picker,AppState,I18nManager  } from 'react-native';
import { Container, Grid, Col, Header, Left, Body, Right, Button, Title ,Content,Footer,FooterTab,Badge,StyleProvider,Form,Item, Input, Card, CardItem, Thumbnail, List, ListItem,Spinner,Separator,InputGroup,Textarea,Root,Toast,Icon } from 'native-base';
import getTheme from '../native-base-theme/components';
import { TextField } from 'react-native-material-textfield';
import material from '../native-base-theme/variables/material';
import SpinnerScreen from '../screens/SpinnerScreen';
//import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import PhoneInput from 'react-native-phone-input';

import { FlatGrid } from 'react-native-super-grid';
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

var baseUrl="https://timelinemw.com/api/";
export default class orders extends React.Component{
	
	
	
    static navigationOptions = {
    header: null
    }
    
    constructor(props) {
        super(props);
       this.state = {
        isLoading:true,
        resourceData:[],
        
        };
    }
    
     componentWillReceiveProps(nextProps) {
      
    }
	
   
    
    refresh(){
		
	}
   
 
    componentDidMount()
    {
        fetch(baseUrl+'notificationhistory', {
                  method: "GET",
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  }
                  }).then((response) => response.json())
                  .then((responseData) => {
                  //console.log('dealsOf',responseData);
				  if(responseData.errorCode==0){
				         this.setState({resourceData:responseData.result,isLoading:false});
				  
				  }else{
					  this.setState({resourceData:[],nodata:true,isLoading:false,});
				  }
                  
                  }).catch(function(error){
                           console.log(error.message);
                           });
    }
    
    render() {
		 
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
		
        //let { errors = {}, secureTextEntry, ...data } = this.state;
        //let { Phone = 'Phone' } = data;
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
                <Header style={{height:80,backgroundColor:'#b71117'}}>
				
				<StatusBar/>
					  <Left style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 20 :20):35,paddingLeft:10}}>				 
						<TouchableOpacity style={{width:"100%", height:"100%"}} onPress={() => this.props.navigation.goBack()}>
							<Icon  style={{fontSize:30, color:'#ffffff'}} name='ios-arrow-back' />
						 </TouchableOpacity >							 
					</Left>
						<Body style={{flex:1,justifyContent: 'center', alignItems: 'center',paddingTop:platform === "ios" ? (isIphoneX ? 0 :0):20}} >
					       <Text style={{color:'#ffffff',fontSize:15}}>Notifications</Text>
					    </Body>

					<Right style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>				 
                      
					</Right>
								 
				</Header>
                 <View style={{flexDirection:'row', marginTop:6, alignItems:'flex-end', justifyContent:'flex-end'}}>
						<View style={{paddingRight:10}}>
							<Button transparent style={{borderRadius: 10,backgroundColor: '#b71117',width:100,alignItems: 'center', justifyContent:'center'}}  onPress={() => this.props.navigation.navigate('pushnotification')}>
								<Text style={{fontSize:Platform.OS === 'ios' ?14:14,color:'white',textAlign:'center'}}>Send Notify</Text>
							</Button>
						</View>
                 </View>
                
                <Content contentContainerStyle={{padding: 0, margin:0}}>
				{this.state.nodata?
				<View style={{paddingTop:15}}> 
					 <Text style={{textAlign: 'center',color:'#808080',fontSize:13}}>Notifications not Yet</Text>
				</View>:false}
				
				{data.map((item, index) => {
          return(
		
            <View style={{padding: 5}} key={item.Id}>
				<Card>
					<CardItem header bordered>
					 <View style={{flexDirection:'column'}}>
					 <View style={{flexDirection:'row'}}>
						      <Text style={{color:'#000000',fontWeight:'bold'}}>Title </Text>
						      <Text style={{color:'#808080',fontSize:14,paddingBottom:5}}>: {item.Title}</Text>
						  </View>
						 
						  </View>
						
							</CardItem>
								<CardItem bordered>
									<Body>
										<Text>
										{item.Description}
										</Text>
									</Body>
							</CardItem>
							<CardItem footer bordered>
						<Text>{item.date}</Text>
					</CardItem>
				</Card>
			</View>
			)
			})
			}
               
                </Content>
			
                </Container>
                </StyleProvider>
				</Root>
                );
    }
}

const styles = StyleSheet.create({
  gridView: {
    //marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 120,
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