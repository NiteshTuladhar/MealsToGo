import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import { Search } from "../../map/components/search.components";

import { LoactionContext } from '../../../services/location/location.context';
import { RestaurantContext } from '../../../services/restaurant/restaurants.context';
import { MapCallout } from "../components/map-callout.components";

const Map = styled(MapView)`
    height: 100%;
    width: 100%;
`;
export const MapScreen = ({ navigation }) => {
    const { location } = useContext(LoactionContext);
    const { lat, lng, viewport } = location;
    const { restaurants=[] } = useContext(RestaurantContext);
    const [latDelta, setLatDelta] = useState(0);

    useEffect(() => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        const latDelta = northeastLat - southwestLat;
        setLatDelta(latDelta);
    }, [location, viewport]);

    return (
        <>
            <Search />
            <Map
                region={{
                   latitude: lat,
                   longitude: lng,
                   latitudeDelta: latDelta,
                   longitudeDelta: 0.02,
                }}
            >
                {
                    restaurants.map((restaurant)=>{
                        
                        return (
                            <MapView.Marker
                                key={restaurant.name}
                                title = {restaurant.name}
                                coordinate = {{
                                    latitude : restaurant.geometry.location.lat,
                                    longitude : restaurant.geometry.location.lng,
                                }}
                            >
                                <Map.Callout onPress={()=>navigation.navigate("RestaurantDetails", {
                                    restaurant
                                })}>
                                    <MapCallout restaurant={restaurant} />
                                </Map.Callout>
                            </MapView.Marker>
                        )
                    } )
                }
            </Map>
        </>
    )
};  