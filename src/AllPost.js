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
    FlatList
} from 'react-native';
import storage from '@react-native-firebase/storage';
import app from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';



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
    const list = []
    useEffect(() => {
        // const fetchPost = async () => {
        //     try {
        //         firestore()
        //             .collection('post')
        //             .get()
        //             .then((querySnapShort) => {
        //                 querySnapShort.forEach(doc => {
        //                     const { post, postTime } = doc.data()
        //                     list.push({
        //                         post: post,
        //                         postTime: postTime
        //                     })
        //                 })
        //                 console.log(list)
        //                 setPostItem(list)
        //                 // console.log(post)
        //             }
        //             )
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }

        // fetchPost()
        const subscriber = firestore()
            .collection('post')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        // key: documentSnapshot.id,
                    });
                });

                setPostItem(users);
                
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, [])
    // const renderItem = ({ item }) => (
    //     <Item title={item.postTime} />
    // );
    return (
        <View style={{ flex: 1,  }}>
            <FlatList
                data={postItem}
                renderItem={({ item }) => (
                    <View style={{  flex: 1,alignItems:'center'  }}>
                        {/* <Text style={{ color: 'black' }}>{item.postTime}</Text> */}
                        <Image
                            style={{height:400,
                                width:'80%',
                                marginTop:20,
                                borderRadius:25,
                                resizeMode:'contain'
                            }}
                            source={{uri:item.post}}
                            />
                    </View>
                )}
            />
            <Text style={{ color: 'black' }}>{postItem.postTime}</Text>
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