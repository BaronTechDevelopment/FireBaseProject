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
import Chat from './src/Chat';
import UserList from './src/UserList';
import { firebase } from '@react-native-firebase/auth';

const Stack = createStackNavigator();



const App = () => {
  // const [user, setUser] = useState("")
  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged((userExist) => {
  //     if (userExist) {
  //       console.log(userExist.email)
  //       setUser(userExist)
  //     } else {
  //       setUser("")
  //     }
  //   });
  // }, [])
  // console.log(user)
  return (
   
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="Chat" component={Chat} options={({ route }) =>
          ({ title: route.params.name, headerShown: true })} />
        <Stack.Screen name="AllPost" component={AllPost} />
        <Stack.Screen name="UserList" component={UserList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default App;
