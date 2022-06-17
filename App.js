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
import AddPost from './src/AddPost';
import EditProfile from './src/EditProfile';
import AllPost from './src/AllPost';
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


  function addUser() {
    useEffect(() => {
      // firestore()
      //   .collection('user')
      //   .add({
      //     name: 'Abaid',
      //     email:'abaid@gmail.com',
      //     password:'12abaid'
      //   })
      //   .then(() => {
      //     console.log('User added!');
      //   });

      firestore()
        .collection('user')
        .doc('AVX3XSBhgjVGfILJeoeh')
        .set({
          name: 'Abaid',
          email: 'abaid@gmail.com',
          password: '12abaid'
        })
        .then(() => {
          console.log('User added!');
        });
    })
  }

  function updateUser() {
    useEffect(() => {
      firestore()
        .collection('user')
        .doc('AVX3XSBhgjVGfILJeoeh')
        .update({
          password: '1111111',
        })
        .then(() => {
          console.log('User updated!');
        });
    })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddPost" component={AddPost} />

        <Stack.Screen name="AllPost" component={AllPost} />

      </Stack.Navigator>
    </NavigationContainer>
    // <View style={{ flex: 1 }}>
    //   {User()}
    //   {/* {addUser()} */}
    //   {/* {updateUser()} */}
    //   <Text>Saif</Text>
    // </View>

  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default App;
