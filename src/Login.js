import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth'


function Login({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)


    function login() {
        auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            console.log('succesfully login')
            navigation.navigate('Home')
        })
            .catch((error) => {
                console.log(error)
                Alert.alert(error.message)
            });
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
                placeholder="Enter Your Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={(val) => setPassword(val)}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                if (email.trim() === "" || password.trim() === "") {
                    Alert.alert("please fill out the all fields")
                }
                else{

                    {login()}

                }
            }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 25 }} onPress={() => (navigation.navigate('SignUp'))}>
                <Text style={{ color: 'blue' }}>Don't have an account? SignUp</Text>
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

export default Login