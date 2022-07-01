import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

import { firebase } from '@react-native-firebase/auth';


function Home({ navigation }) {
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")

    // useEffect(() => {
    //     getFcmToken();
    //     requestUserPermission()
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         onDisplayNotification(remoteMessage)
    //         console.log("remoteMessage", JSON.stringify(remoteMessage))
    //         // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);


    // const getFcmToken = () => {
    //     messaging().getToken()
    //         .then((token) => {
    //             console.log(token)
    //         })
    // }

    // async function requestUserPermission() {
    //     const authStatus = await messaging().requestPermission();
    //     console.log(authStatus)
    // }

    // const onDisplayNotification = async (remoteMessage) => {

    //     // Create a channel (required for Android)
    //     const channelId = await notifee.createChannel({
    //         id: 'default',
    //         name: 'Default Channel',
    //     });

    //     // Display a notification
    //     await notifee.displayNotification({
    //         title: remoteMessage.notification.title,
    //         body: remoteMessage.notification.body,
    //         android: {
    //             channelId,
    //             pressAction: {
    //                 id: 'default',
    //             },
    //         },
    //     });
    // }


    

    function SignOut() {
        auth().signOut()
            .then(() => {
                // console.log('signout')
                navigation.navigate('Login')
            })
            .catch((error) => { console.log(error.message) })
    }


    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUserId(user.uid)
    }, [userId])

    firestore()
        .collection('user')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
            setUserName(documentSnapshot.data().name)
        }
        )

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginBottom: 30 }}>
                <Text style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20
                }}>Helo {userName}</Text>
            </View>
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
            }}
                onPress={() => {
                    navigation.navigate('AddPost')
                    // handleNotification()
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
            }}
                onPress={() => navigation.navigate('UserList')}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
            }}
                onPress={() => navigation.navigate('AllPost')}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>All Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}
                onPress={() => { SignOut() }}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Signout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: 17
            }}
                onPress={() => navigation.navigate('Followers')}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Follwers</Text>
            </TouchableOpacity>
            {/* 
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: 17
            }}
                onPress={() => { onDisplayNotification() }}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Display Notification</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Home