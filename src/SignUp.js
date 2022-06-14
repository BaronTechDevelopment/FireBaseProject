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
    TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function SignUp({ navigation }) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    function addUser() {

        firestore()
            .collection('user')
            .add({
                name:  name ,
                email:  email ,
                password:  password 
            })
            .then(() => {
                console.log('User added!');
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
                placeholder="Enter Your Name"
                placeholderTextColor="black"
                value={name}
                onChangeText={(val) => setName(val)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={(val) => setPassword(val)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => (addUser(),
                    navigation.navigate('Home')
                    )}
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
        color:'black'
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