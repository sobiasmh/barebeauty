import { Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    FlatList,
    Modal,
    Pressable,
    View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import OrderSteps from './OrderSteps';
import {useState} from 'react';
import COLORS from '../const/colors';
const {width} = Dimensions.get('window');
import Toast from 'react-native-toast-message';

import baseURL from '../../assets/common/baseURL';

export default function Order({activeTab, navigation}) {
const {cartData} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.user);
  const [active, setActive] = useState(1);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [pin, setPin] = useState('');
  const [getId, setId] = useState()


  const totalPrice = cartData.reduce((acc, curr) => acc + curr.productPrice*curr.quantity, 0);

  
  const order = {
    shippingInfo: {
      address,
      city: cityName,
      country: countryName,
      state,
      pinCode: pin,
      phoneNo: phoneNumber,

    },
    orderItems: cartData ,
    user: user._id,
    totalPrice: totalPrice,
   
  };
  const confirmOrderHandler = () => {
   
    
   
    if (cartData?.length > 0) {
      axios
            .post(`${baseURL}order/newOrder`, order  
            )
            .then((res) => {
                if (res.status == 201) {
                  setId(res.data.trackigID)
                  setActive(3)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
  };

  const shippingDetailsHandler = () => {
    console.log("oo")
    if (
      address.length > 0 &&
      phoneNumber.length > 0 &&
      countryName.length > 0 &&
      cityName.length > 0 &&
      state.length > 0 &&
      pin.length > 0
    ) {
      setActive(2);
    } else {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: 'Please fill all the fields',
          });
    }
    
  };

  if(active === 1){
    return(
      
      <ScrollView style={styles.container}>
              <OrderSteps activeTab={active} />

         <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(address) =>
                setAddress(address)
              }
              placeholder="Enter your Address" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
             style={styles.inputStyle}
             onChangeText={(phoneNumber) =>
               setPhoneNumber(phoneNumber)
             }
             placeholder="Enter your Phone Number" //12345
             placeholderTextColor="#8b9cb5"
             keyboardType="default"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(countryName) =>
                setCountryName(countryName)
              }
              placeholder="Enter your Country" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(state) =>
                setState(state)
              }
              placeholder="Enter your State" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(cityName) =>
                setCityName(cityName)
              }
              placeholder="Enter your City" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(pin) =>
                setPin(pin)
              }
              placeholder="Enter Pincode" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
            />
          </View>
        <TouchableOpacity style={{
            backgroundColor:COLORS.primary,
            height:33,
            width: 150,
            marginLeft: 200,
            elevation: 8,
            borderRadius: 10,
        }} onPress={()=>{shippingDetailsHandler()}}>
          <Text style={{
             color:COLORS.white, 
             fontSize:15,
             padding:4, 
             textAlign:"center"
          }}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

    );
  }
  else if(active === 2){
    return(
      <View style={styles.container}>
      <OrderSteps activeTab={active} />
      
      <View>
      <View style={styles.header}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}> Your Shipment Details</Text>
      </View>
      <View style={{backgroundColor:"#f5dfe6", borderWidth:1, borderRadius:10, padding:4, margin:10, borderColor:COLORS.primary}}>
          <View style={{flexDirection:"row", justifyContent:"flex-start"}}>
          <Icon name="home" size={28} color={COLORS.primary}/>
          <Text style={{color: COLORS.primary, fontSize: 18,fontWeight:"bold", padding: 4}}>
                Home
          </Text>
          <View style={{marginLeft:215}}>
          <Icon name="checkmark-circle-outline" size={28} color={COLORS.primary}/>

          </View>
          </View>
        <Text style={{color: '#333', fontSize: 18,fontWeight:"bold", padding: 4}}>
         {user.name}
        </Text>
        <Text style={{color: '#333', fontWeight:"bold", fontSize: 16, padding: 4}}>
        {phoneNumber}
        </Text>
        <Text style={{color: '#333', fontSize: 16, padding: 4}}>
          {user.email}

        </Text>
        <Text style={{color: 'grey', fontSize: 16, padding: 6}}>
          {address}, {cityName}, {countryName}
        </Text>
        </View>
        <Text style={{color: '#333', fontWeight:"bold", fontSize: 20, textAlign:"left", margin:15}}>
          Your Cart Items
        </Text>
        <View style={{height:"35%"}}>
        {cartData && cartData.length>0?(
          
        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        
        data={cartData}

        renderItem={({item}) => {
          return(
          <View style={styles.cartCard} key={item.key}>
        <Image source={{uri:item.productImage}} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.productName}</Text>
          
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Rs. {item.productPrice}</Text>
        </View>
        <View style={{marginRight: 5, alignItems: 'center'}}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Quantity: {item.quantity}</Text>
         
        </View>
        
      </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}

      />
     
          ):(
            <View>
              <Text>Hi</Text>
            </View>
          )
        }
         </View>
      </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderColor: '#00000036',
          }}>
          <Text style={{color: '#333',fontWeight:"bold", padding: 10, fontSize: 18}}>
            TotalPrice:
          </Text>
          <Text style={{color: '#333', padding: 10, fontSize: 16}}>
            Rs. {cartData.reduce((acc, curr) => acc + curr.productPrice * curr.quantity, 0)}
          </Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor:COLORS.primary,
          height:33,
          width: 150,
          marginLeft: 230,
          elevation: 8,
          borderRadius: 10,

        }} onPress={()=>{confirmOrderHandler()
          }}>
          <Text style={{
             color:COLORS.white, 
             fontSize:15,
             padding:4, 
             textAlign:"center",

          }}>Confirm Order</Text>
        </TouchableOpacity>

        </View>

    );
  }
  else{
  return (
    <View
          style={{
            marginTop:120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{
            resizeMode: 'cover',
            height: 250,
            width: 250,
            marginTop:200,

          }}

            source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/order-confirmation-5365232-4500195.png" }} />

          <Text style={{ color: '#333', fontSize: 20, textAlign: 'center', fontWeight:"bold" }}>
           Your Order is Placed Successfully
          </Text>
          <Text style={{ color: '#333', fontSize: 20, textAlign: 'center', fontWeight:"bold" }}>
           Your Trackig ID is : {getId}
          </Text>
          
          <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 33,
                    width: 150,
                    borderRadius: 10,
                    marginRight: 18,
                  }}

                  onPress={() => {
                    navigation.navigate('Cart')
                  }}>
                  <Text style={styles.adcarttextStyle}>Go Back</Text>
                </TouchableOpacity>
        </View>
   );
 }
}

  

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
  
        
      },
  OrderStepsMain: {
    width: width * 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  OrderSteps: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius:10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    
  },
  adcarttextStyle: {
    color: COLORS.white,
    fontSize: 16,
    padding: 4,
    textAlign: "center",
    fontWeight:"bold"
  },
});