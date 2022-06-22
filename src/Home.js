import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
import { firebase } from '@react-native-firebase/auth';


function Home({ navigation }) {
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
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
                onPress={() => navigation.navigate('Chat')}
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
        </View>
    )
}

export default Home