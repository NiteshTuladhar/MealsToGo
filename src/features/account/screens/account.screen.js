import React from "react";
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import { AccountBackground, AccountContainer, AccountCover, AnimationWrapper, AuthButton, Title } from "../component/account.styles";



export const AccountScreen = ({ navigation }) => {
    return (
         <AccountBackground>
            <AccountCover />
            <AnimationWrapper>
                <LottieView 
                    key="animation"
                    autoPlay
                    loop
                    resizeMode = "cover"
                    source = {require("../../../../assets/watermelon.json")}
                />
            </AnimationWrapper>
            <Title>Meals To Go</Title>
            <AccountContainer>
                <AuthButton
                    icon="lock-open-outline" 
                    mode="contained"
                    onPress={()=> navigation.navigate('Login')}
                >
                    Login
                </AuthButton>
                <View style={{ marginVertical: 10 }}/>
                <AuthButton
                    icon="email"       
                    mode="contained"
                    onPress={()=> navigation.navigate('Register')}
                >
                    Register
                </AuthButton>
            </AccountContainer>
        </AccountBackground>
    ) 
}