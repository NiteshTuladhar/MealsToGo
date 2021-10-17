import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import styled from 'styled-components/native';

import { Spacer } from "../spacer/spacer.components";
import { CompactRestaurantInfo } from '../restaurant/compact-restaurant-info.components';

const FavouritesWrapper = styled.View`
    padding : 10px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
    if (!favourites.length){
        return null;
    }
    
    return (
        <FavouritesWrapper>
            <View style={{ marginHorizontal:10 }}>
                <Text>Favourites</Text>
            </View>
            <ScrollView
                horizontal showsHorizontalScrollIndicator={false}
            >
                {
                    favourites.map((restaurant) => {
                        const key = restaurant.name;
                        return (
                            <View key={key} style={{ margin: 10 }} >
                                <TouchableOpacity onPress={()=>onNavigate("RestaurantDetails",{
                                    restaurant,
                                })}>
                                    <CompactRestaurantInfo restaurant={restaurant} />
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </FavouritesWrapper>
    )
}