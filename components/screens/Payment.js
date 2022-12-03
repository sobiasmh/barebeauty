import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Order from './Order';
import baseURL from '../../assets/common/baseURL';
import {StripeProvider} from '@stripe/stripe-react-native';
import axios from 'axios';

export default function Payment({navigation}) {
   const [publishableKey, setpublisheableKey] = useState("");
   async function getStripeApiKey() {
    const {data} = await axios.get(`${baseURL}stripeapikey`);
    setpublisheableKey(data.stripeApiKey);
   }
   useEffect(() => {
    getStripeApiKey();
   }, [])
   
   
  return (
    <StripeProvider publishableKey={publishableKey}>
      <Order navigation={navigation} />
      </StripeProvider>
  );
}