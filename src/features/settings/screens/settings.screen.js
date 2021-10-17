import React, { useContext, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
 

import { SafeArea } from "../../../components/utility/safe-area-component";
import { AuthenticationContext } from '../../../infrastructure/authentication/authentication.context';
import { Text } from '../../../components/typography/text.components';


const SettingsItem = styled(List.Item)`
    padding : ${(props)=> props.theme.space[3]};
`;

const AvatarContainer = styled.View`
    align-items: center;
    margin-top : 20px;

`;


export const SettingsScreen = ({ navigation }) => {
    const { onLogout, user } = useContext(AuthenticationContext);
    const [photo, setPhoto] = useState(null);

    const getProfilePicture = async(currentUser) => {
        const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
        setPhoto(photoUri);
    }
    //.Similar to useEffect but only triggers every time the screen is back into focus
    useFocusEffect(() => {
        getProfilePicture(user);
    }, [user]);

    return(
        <SafeArea>
            <TouchableOpacity onPress={()=> navigation.navigate("Camera")}>
                <AvatarContainer>
                    {
                        !photo &&
                            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
                    }

                    {
                        photo &&
                            <Avatar.Image size={180} source={{ uri:photo }} backgroundColor="#2182BD" />
                    }

                    <View style={{ marginVertical: 10 }}/>
                    <Text variant="label">{user.email}</Text>
                </AvatarContainer>
            </TouchableOpacity>
            
            <List.Section>
                <SettingsItem
                    title="Favourites"
                    description="View your favourites"
                    left={(props) => <List.Icon {...props} color="black" icon="heart" />}
                    onPress={() => navigation.navigate("Favourites")}
                />
                <SettingsItem
                    title="Logout"
                    left={(props) => <List.Icon {...props} color="black" icon="door" />}
                    onPress={onLogout}
                />
            </List.Section>
        </SafeArea>
)};