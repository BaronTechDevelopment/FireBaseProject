import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth'

function Home({ navigation }) {
    function SignOut() {
        auth().signOut()
            .then(() => {
                console.log('signout')
                navigation.navigate('Login')
            })
            .catch((error) => { console.log(error.message) })
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{
                height: "6%",
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
            }}
            >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Add Post</Text>
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