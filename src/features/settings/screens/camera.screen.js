import React, { useRef, useState, useEffect, useContext } from "react";
import { View, TouchableWithoutFeedback, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import styled from "styled-components/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity} from 'react-native-gesture-handler'

import { Text } from '../../../components/typography/text.components'
import { AuthenticationContext } from "../../../infrastructure/authentication/authentication.context";


const Touchable = Platform.select({ ios: TouchableOpacity, android: TouchableWithoutFeedback });

const ProfileCamera = styled(Camera)`
    width: 100%;
    height: 100%;
`;
export const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef();
    const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        console.log(`camera ref inside`)
        if(cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
            navigation.goBack();
        }
    };

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);
    
    if (hasPermission === null) {
    return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
         
            <TouchableOpacity onPress={snap}>
                <ProfileCamera ref={(camera) => (cameraRef.current = camera)} type={Camera.Constants.Type.front} />
            </TouchableOpacity>
        
    )
}