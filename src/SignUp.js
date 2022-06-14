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

function SignUp({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ color: "black", fontSize: 30, marginBottom: 60, fontWeight: 'bold' }}>DemoApp</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                placeholderTextColor="black"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                placeholderTextColor="black"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="black"
            />
            <TouchableOpacity style={styles.button} onPress={() => (navigation.navigate('Home'))}>
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
        borderRadius: 6
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