import React, { useState, useContext } from "react";
import { View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Text } from '../../../components/typography/text.components';
import { AuthenticationContext } from "../../../infrastructure/authentication/authentication.context";
import { AccountBackground, AccountContainer, AccountCover, AuthButton, AuthInput, Title } from "../component/account.styles";

export const RegisterScreen = ({ navigation }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatedPassword, setRepeatedPassword ] = useState("");

    const { onRegister, isLoading, error  } = useContext(AuthenticationContext);

    return (
         <AccountBackground>
            <AccountCover />
            <Title>Meals To Go</Title>
            <AccountContainer>
                <AuthInput 
                    label = "E-mail"
                    value = {email}
                    textContentType = "emailAddress"
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    onChangeText = {(u) => setEmail(u)}
                />
                <View style={{ marginVertical: 10 }}/>
                <AuthInput 
                    label = "Password"
                    value = {password}
                    textContentType = "password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText = {(p) => setPassword(p)}
                />
                <View style={{ marginVertical: 10 }}/>
                <AuthInput 
                    label = "Confirm Password"
                    value = {repeatedPassword}
                    textContentType = "password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText = {(rp) => setRepeatedPassword(rp)}
                />
                <View style={{ marginVertical: 10 }}/>
                {
                    error.length !== 0 ? 
                    <Text variant='error'>{error}</Text> : null
                }
                <View style={{ marginVertical: 10 }}/>
                {
                !isLoading ? ( 
                <AuthButton
                    icon="email"
                    mode  ="contained"
                    onPress = {()=> onRegister(email, password, repeatedPassword)} 
                >
                    Register
                </AuthButton>): (
                    <ActivityIndicator animating={true} color={Colors.blue300} />
                )
                
                }
                <View style={{ marginVertical: 10 }}/>
                <AuthButton mode="contained" onPress={()=> navigation.navigate('Main')}>
                    Go Back
                </AuthButton>
            </AccountContainer>
        </AccountBackground>
    )
}