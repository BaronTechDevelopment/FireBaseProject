import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
    Alert,
    AppRegistry,
    DevSettings,
} from 'react-native';
import App from '../App';

import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

function Chat({ route, navigation }) {

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("")
    const { id, name } = route.params

    const getCurrentUser = () => {
        const user = firebase.auth().currentUser;
        setUser(user.uid)
    }

    useEffect(() => {
        getFcmToken();
        requestUserPermission()
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            onDisplayNotification(remoteMessage)
            // console.log("remoteMessage", JSON.stringify(remoteMessage))
            backgroundHandler()
        });

        return unsubscribe;
    }, []);

    const getFcmToken = () => {
        messaging().getToken()
            .then((token) => {
                console.log(token)
            })
    }

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        console.log(authStatus)
        // return authStatus
    }

    const onDisplayNotification = async () => {

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: "New Message",
            body: `Message received from ${name}`,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    const backgroundHandler = () => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            // console.log(remoteMessage)
            onDisplayNotification()
        });
        AppRegistry.registerComponent('app', () => App);
    }

    useEffect(() => {
        getCurrentUser()
        getAllMsg()
    }, [user])

    const getAllMsg = async () => {
        const docId = id > user ? user + "-" + id : id + "-" + user
        console.log(docId)
        const querySnap = await firestore().collection('chatRoom')
            .doc(docId)
            .collection('messages')
            .orderBy('createdAt', "desc")
            .onSnapshot(querySnapShot => {
                const allMessages = querySnapShot.docs.map(documentSnapShot => {
                    return {
                        ...documentSnapShot.data(),
                        createdAt: documentSnapShot.data().createdAt.toDate(),

                    }
                })
                setMessages(allMessages)
            })
        return () => {
            querySnap()
        }
    }

    const onSend = useCallback((messages = []) => {
        const msg = messages[0]
        const docId = id > user ? user + "-" + id : id + "-" + user
        const myMsg = {
            ...msg,
            sentBy: user,
            sentTo: id,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
        firestore()
            .collection('chatRoom')
            .doc(docId)
            .collection('messages')
            .add({
                ...myMsg,
                screatedAt: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                <Notification />
            })
    }, [user])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Alert.alert('Auto refresh')
            console.log("after refereshing")
            getAllMsg()
        });
        return unsubscribe;
    }, [user]);

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