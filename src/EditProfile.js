import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';


function EditProfile() {
    const [updateName, setUpdateName] = useState("")
    const [userId, setUserId] = useState("")
    const updateUser = () => {
        // console.log('updated')
        firebase.auth().onAuthStateChanged(function (user) {
            // console.log(user.uid)
            // setUserId(user.uid)
        })

        // firestore()
        //     .collection('user')
        //     .doc('cQKw6gbaF9o7pdUtOiJq')
        //     .update({
        //         name: updateName,
        //     })
        //     .then(() => {
        //         console.log('User updated!');
        //     });
        // firestore().collection('user').doc('uY1rIwLtzhUZZfM6sAdX').get()
        //     .then(snapshot => console.log(snapshot.data()))

        // firebase.auth().onAuthStateChanged(function (user) {
        //    console.log(user.displayName)
        // })
    //     const user = firebase.auth().currentUser;
    // let uid;
    // if (user != null) {
    //   uid = user.uid;
    //   const db = firebase.firestore();
    //   const docRef = db.collection('users').doc(uid);
    //   docRef.update({
    //     name,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //   }).then(() => {
    //     console.log('Profile Successfully Edited!');
    //   }).catch((error) => {
    //     console.log('Error updating the document:', error);
    //   })
    // }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style={{
                borderWidth: 1,
                width: '80%',
                marginBottom: 20,
                paddingLeft: 10,
                color: 'black'
            }}
                placeholder="Enter Your Name"
                placeholderTextColor="black"
                onChangeText={(val) => { setUpdateName(val) }}
            />
            <TouchableOpacity style={{
                height: '7%',
                width: '80%',
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center'
            }}
                onPress={() => { updateUser() }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditProfile