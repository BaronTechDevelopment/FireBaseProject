import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import database from '@react-native-firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import SignUp from './src/SignUp';
import Home from './src/Home';
import firestore from '@react-native-firebase/firestore';
const Stack = createStackNavigator();



const App = () => {
  // const [name,setName] = useState('')

  // function User() {
  //   useEffect(() => {
  //     const onChildAdd = database()
  //       .ref('/User')
  //       .on('child_added', snapshot => {
  //         setName(snapshot.val());
  //       });

  //     // Stop listening for updates when no longer required
  //     return () => database().ref('/User').off('child_added', onChildAdd);
  //   }, []);
  // }



  function User() {
    useEffect(() => {
      const subscriber = firestore()
        .collection('user')
        .doc('AVX3XSBhgjVGfILJeoeh')
        .onSnapshot(documentSnapshot => {
          console.log('User data: ', documentSnapshot.data());
        });
  
      // Stop listening for updates when no longer required
      return () => subscriber();
    }, []);
  }

  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{headerShown:false}} >
    //     <Stack.Screen name="SignUp" component={SignUp} />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Home" component={Home} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={{flex:1}}>
      {User()}
      <Text>Saif</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default App;
