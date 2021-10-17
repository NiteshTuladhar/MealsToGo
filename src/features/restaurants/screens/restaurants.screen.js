import React, { useContext, useState } from "react";
import { TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Spacer } from "../../../components/spacer/spacer.components";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { RestaurantContext } from "../../../services/restaurant/restaurants.context";
import RestaurantInfoCard from "../components/restaurant-info";
import { Search } from "../components/search.components";
import { FavouritesContext } from "../../../services/favourites/favourites.contex";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.components";
import { RestaurantList } from '../components/restaurant-list.styles';
import { FadeInView } from "../../../components/animations/fade.animation";




const Loading =styled(ActivityIndicator)`
  margin-left : -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top : 50%;
  left: 50%;
`;

export const RestaurantsScreen =({ navigation }) => {
  
  const { isLoading, error ,restaurants } = useContext(RestaurantContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled,setIsToggled] = useState(false);

  return (
    <SafeArea>
      
          {
            isLoading && (
              <LoadingContainer>
                <Loading size={50} animating={true} color={Colors.blue300} />
              </LoadingContainer>
            )
          }
          <Search isFavouritesToggled={isToggled} onFavouritesToggle={()=>setIsToggled(!isToggled)} />
          {
            isToggled && (
              <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />
            )
          }
          
            <RestaurantList
              data = {restaurants}
              renderItem= {({ item })=>{
              return(
                <TouchableOpacity onPress={()=> navigation.navigate("RestaurantDetails", {
                  restaurant : item,
                })}>
                  <Spacer size='large' sposition='bottom'>
                    <FadeInView>
                      <RestaurantInfoCard restaurant = {item} />
                    </FadeInView>
                  </Spacer>
                </TouchableOpacity>
              
              )}}
              keyExtractor = {(item)=>item.name}
              contentContainerStyle = {{ padding: 10 }}
              />
        
    </SafeArea>
  
)};

export default RestaurantsScreen;