import React, { useState, useCallback, useEffect, useId } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function FollowerProfile({ route }) {

    const { id, name } = route.params
    const [user, setUser] = useState("")
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUser(user.uid)
        console.log(user.uid)
    }, [user])
    // const docId = id > user ? user + "-" + id : id + "-" + user
    // console.log(docId)
    useEffect(() => {
        firestore()
            .collection('user')
            .doc(id)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    // console.log('User data: ', documentSnapshot.data().name);
                    setUserName(documentSnapshot.data().name)
                }
            });
    }, [userName])

    const onSend = () => {
        firestore()
            .collection('follow')
            .doc()
            .set({
                sentBy: user,
                sentTo: userName,
                receiverId: id
            })
    }
    return (
        <View>
            <TouchableOpacity style={{
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: 'black',
                height: '25%',
                alignItems: 'center',
                justifyContent: 'center',
            }} onPress={() => onSend()}  >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Follow {name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FollowerProfile