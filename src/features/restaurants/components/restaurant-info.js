import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Address, Icon, Info, Rating, RestaurantCard, RestaurantCardCover, Section, SectionEnd } from "./restaurant-info.styles";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { Favourite } from "../../../components/favourites/favourites.components";

const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant; 

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={2}>
      <Favourite restaurant={restaurant} />
      <View>
        <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      </View>
      <Info>
          <Text variant="label">{name}</Text>
          <Section>
            <Rating>
              {ratingArray.map((_, i) => (
                <SvgXml
                  key={`star-${placeId}-${i}`}
                  xml={star}
                  width={20}
                  height={20}
                />
              ))}
            </Rating>
            <SectionEnd>
              {isClosedTemporarily && (
                <Text variant="caption">CLOSED TEMPORARILY</Text>
              )}
              <Spacer size="large" sposition='left'>
                {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
              </Spacer>
              <Spacer size="large" sposition='left'>
                <Icon source={{ uri: icon }} />
              </Spacer>
            </SectionEnd>
          </Section>
          <Address>{address}</Address>
        </Info>
    </RestaurantCard>
  );
};

export default RestaurantInfoCard;