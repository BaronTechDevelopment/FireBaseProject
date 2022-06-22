import React, { useEffect, useState } from 'react';
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
import storage from '@react-native-firebase/storage';
import app from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    <View style={{ flex: 1 }}>
        <Text style={{ color: 'black' }}>{title}</Text>
    </View>
);



function AllPost() {
    const [postItem, setPostItem] = useState([]);
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const list = []
    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUserId(user.uid)
    }, [userId])

    firestore()
        .collection('user')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
            setUserName(documentSnapshot.data().name)
            // console.log(userName)
        }
        )
    useEffect(() => {
        const subscriber = firestore()
            .collection('post')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                    });
                });

                setPostItem(users);

            });

        return () => subscriber();
    }, [])

    function likes() {
        firestore()
            .collection('likes')
            .add({
                likes: userName
            })
            .then(() => {
                console.log('like added');
            });
    }

    return (
        <View style={{ flex: 1, }}>
            <FlatList
                data={postItem}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {/* <Text style={{ color: 'black' }}>{item.postTime}</Text> */}
                        <Image
                            style={{
                                height: 400,
                                width: '80%',
                                marginTop: 20,
                                borderRadius: 25,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: item.post }}
                        />
                        <TouchableOpacity onPress={() => likes()}>
                            <Text style={{ color: 'black', marginTop: 10 }}>Like</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

});

export default AllPost