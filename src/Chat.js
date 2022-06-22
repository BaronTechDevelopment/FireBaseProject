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

function Chat() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("")
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Saif',
                createdAt: new Date(),
                name: 'saif',
                user: {
                    _id: 2,
                    name: 'Saif',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])


    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUser(user.uid)
        console.log(user)
    }, [user])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    


    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            onSend={messages => onSend(messages)}
            user={{
                _id: user,
            }}
        />
    )
}

export default Chat