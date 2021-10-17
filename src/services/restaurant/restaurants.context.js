import React, { useState, createContext, useEffect, useMemo, useContext } from "react";

import { restaurantsRequest, restaurantsTransform } from "./restaurant.services";
import {LoactionContext } from '../location/location.context'

export const RestaurantContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location } = useContext(LoactionContext);

    const retreiveRestaurants = (loc) => {
        setIsLoading(true);
        setRestaurants([]);
        setTimeout(()=> {
            restaurantsRequest(loc)
            .then(restaurantsTransform)
            .then((results) => {
                setRestaurants(results);
                setIsLoading(false);

            }).catch(err => {
                setError(err);
                setIsLoading(false);
            })
        }, 2000)
    }
 
    useEffect(() => { 
        if(location){
           
            const locationString = `${location.lat},${location.lng}`
            retreiveRestaurants(locationString);
        }
        retreiveRestaurants();
    }, [location]);

    return (
        <RestaurantContext.Provider value={{
            restaurants,
            isLoading,
            error
        }}>
            { children }
        </RestaurantContext.Provider>
    )
}
