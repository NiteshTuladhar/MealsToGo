import React, { useContext } from "react";
import { TouchableOpacity } from 'react-native'
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area-component";
import { FavouritesContext } from "../../../services/favourites/favourites.contex";
import { Text } from '../../../components/typography/text.components';
import { RestaurantList } from '../../restaurants/components/restaurant-list.styles';
import { Spacer } from "../../../components/spacer/spacer.components";
import RestaurantInfoCard from "../../restaurants/components/restaurant-info";

const NoFavouritesArea = styled(SafeArea)`
    align-items: center;
    justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length? (
        <SafeArea>
            <RestaurantList
                data = {favourites}
                renderItem= {({ item })=>{
                return(
                <TouchableOpacity onPress={()=> navigation.navigate("RestaurantDetails", {
                        restaurant : item,
                })}>
                    <Spacer size='large' sposition='bottom'>
                        <RestaurantInfoCard restaurant = {item} />
                    </Spacer>
                </TouchableOpacity>
                
                )}}
                keyExtractor = {(item)=>item.name}
                contentContainerStyle = {{ padding: 10 }}
            />
        </SafeArea>

    ): 
    
    (
        <NoFavouritesArea>
            <Text center>No Favourites Found.</Text>
        </NoFavouritesArea>
    );
}