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

import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Chat({ route }) {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("")
    const { id } = route.params
    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUser(user.uid)
    }, [user])

    const getAllMsg = async () => {
        const docId = id > user ? user + "-" + id : id + "-" + user
        const querySnap = await firestore().collection('chatRoom')
            .doc(docId)
            .collection('messages')
            .orderBy('createdAt', "desc")
            // .get()
            .onSnapshot(querySnapShot => {
                const allMessages = querySnapShot.docs.map(documentSnapShot => {
                    return {
                        ...documentSnapShot.data(),
                        createdAt: documentSnapShot.data().createdAt.toDate()
                    }
                })
                setMessages(allMessages)

            })
        return () => querySnap()
    }






    const onSend = useCallback((messages = []) => {
        const msg = messages[0]
        const myMsg = {
            ...msg,
            sentBy: user,
            sentTo: id,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))

        const docId = id > user ? user + "-" + id : id + "-" + user
        // console.log(messages)
        // console.log(myMsg)
        firestore()
            .collection('chatRoom')
            .doc(docId)
            .collection('messages')
            .add({
                ...myMsg,
                screatedAt: firestore.FieldValue.serverTimestamp()
            })
    }, [user])

    useEffect(() => {
        getAllMsg()
    }, [user])




    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={false}
            user={{
                _id: user,
            }}
            placeholder="Enter Your Message"

        />
    )
}

export default Chat