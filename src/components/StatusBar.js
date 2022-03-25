import React from "react";
import { StatusBar } from "react-native";

export default () => {
    return(
        <StatusBar
               hidden = {false}
               backgroundColor = "#201B25"
               translucent = {false}
               networkActivityIndicatorVisible = {true}
            />
    );
}