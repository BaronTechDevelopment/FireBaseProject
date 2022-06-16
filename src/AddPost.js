import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

function AddPost() {
    const openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.path);
        });
        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log(image);
        // });
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
            }} onPress={() => openPicker()}>
                <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPost