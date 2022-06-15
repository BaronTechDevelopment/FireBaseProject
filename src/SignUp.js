import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'

function SignUp({ navigation }) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    function addUser() {
        firestore()
            .collection('user')
            .add({
                name: name,
            })
            .then(() => {
                console.log('User added!')
                setName("")
                setEmail("")
                setPassword("")
            });
    }
    function signUpWithEmail() {
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => { console.log('user sign up') })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    return;
                }
                if (error.code === 'auth/invalid-email') {
                    return;
                }
            })
    }
    return (
        <View style={styles.container}>
            <Text style={{ color: "black", fontSize: 30, marginBottom: 60, fontWeight: 'bold' }}>DemoApp</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                placeholderTextColor="black"
                value={name}
                onChangeText={(val) => setName(val)}
                require
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={(val) => setPassword(val)}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
                        Alert.alert("please fill out the all fields")
                    }
                    else {
                        addUser(),
                            signUpWithEmail(),
                            navigation.navigate('Home')
                    }
                }}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 25 }} onPress={() => (navigation.navigate('Login'))}>
                <Text style={{ color: 'blue' }}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 6,
        color: 'black'
    },
    button: {
        height: 40,
        width: '80%',
        backgroundColor: 'black',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    }
});

export default SignUp