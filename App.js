import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, {useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from 'firebase';

import { theme } from "./src/infrastructure/theme";
import { RestaurantsContextProvider } from "./src/services/restaurant/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigator } from "./src/infrastructure/navigation";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.contex";
import { AuthenticationContextProvider } from "./src/infrastructure/authentication/authentication.context";


const firebaseConfig = {
  apiKey: "AIzaSyAikXrzODsQMIBsE7FCz3ifyQfnC04Haho",
  authDomain: "mealstogo-54d45.firebaseapp.com",
  projectId: "mealstogo-54d45",
  storageBucket: "mealstogo-54d45.appspot.com",
  messagingSenderId: "798478857860",
  appId: "1:798478857860:web:fb48885bdff1150fb3f4d1",
};

if (!firebase.apps.length){

  firebase.initializeApp(firebaseConfig);
}

export default function App() {


  return (

    <>
 
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
                <RestaurantsContextProvider>
                  <Navigator />
                </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}