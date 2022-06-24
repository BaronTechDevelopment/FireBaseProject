import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
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
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

function UserList({ navigation }) {
    const [postItem, setPostItem] = useState([])
    const user = firebase.auth().currentUser;
    // console.log(user.uid)
    const getUser = async () => {
        const querySnap = await firestore()
            .collection('user')
            .where('id', '!=', user.uid,['id', '!=', ""])
            .get()
        const allUser = querySnap.docs.map(docSnap => docSnap.data())
        // console.log(allUser)
        setPostItem(allUser)
    }

    useEffect(() => {
        getUser()
    }, [])

    const Card = ({ item }) => {
        return (
            <TouchableOpacity style={{
                marginTop: 20,
                backgroundColor: 'black',
                alignItems: 'center',
                height: 50,
                width: '80%',
                justifyContent: 'center',
                marginLeft: 36,
                borderRadius: 20
            }} onPress={() => navigation.navigate('Chat', { name: item.name, id: item.id })}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, marginTop: 35 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>UserList</Text>
            </View>
            <FlatList
                data={postItem}
                renderItem={({ item }) => { return <Card item={item} /> }}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default UserList