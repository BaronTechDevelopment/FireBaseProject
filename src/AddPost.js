import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { storage, ref, uploadBytes } from '@react-native-firebase/storage';
import app from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';

function AddPost({ navigation }) {
    const [imageuri, setImageuri] = useState(null)
    const openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setImageuri(image.path)
        });
        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log(image);
        // });
    }
    const submitPost = async () => {
        const uploadUri = imageuri
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)
        const storageRef = app.storage().ref(`images/${fileName}`)
        try {
            // console.log(storageRef)
            await app.storage().ref(`images/${fileName}`).putFile(uploadUri)
            const url = await storageRef.getDownloadURL()
            // console.log('upload')

            // console.log(url)
            firestore()
                .collection('post')
                .add({
                    post: url,
                    postTime: firestore.Timestamp.fromDate(new Date())
                }).then(() => {
                    // console.log('confirm')
                    navigation.navigate('AllPost')
                }
                )
                .catch((error) => console.log(error))
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <View style={{ flex: 1, }}>
            <TouchableOpacity style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                alignSelf: 'flex-end',
                height: 60,
                width: 60,
                borderRadius: 50,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={() => {
                openPicker()
            }}>
                <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>
                <Image
                    style={styles.tinyLogo}
                    source={{ uri: imageuri }}
                />
                <TouchableOpacity style={{
                    marginTop: 20,
                    backgroundColor: "black",
                    height: 35,
                    width: "30%",
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                    onPress={() => { submitPost() }}
                >
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                        Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    tinyLogo: {
        width: '80%',
        height: "35%",
        borderRadius: 20
    },
})
export default AddPost