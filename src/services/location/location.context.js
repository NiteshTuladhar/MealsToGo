import React, { useState, createContext, useEffect, useMemo } from "react";
import { locationTransform, locationRequest } from "./location.services";

export const LoactionContext = createContext();

export const LocationContextProvider = ({ children }) => {

    const [keyword, setKeyword] = useState("san francisco");
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
        

    };

    useEffect(() => {
        if (!keyword.length){
            return;
        }
        locationRequest(keyword.toLowerCase()).then(locationTransform)
        .then(result => {
            setIsLoading(false);
            setLocation(result);
        }).catch(err => {
            setIsLoading(false)
            setError(err);
        })
        
    }, [keyword])

    return (
    
    <LoactionContext.Provider
        value={{
            isLoading,
            error,
            location,
            search: onSearch,
            keyword,
         }}
        >
            { children }
    </LoactionContext.Provider>
    )
}