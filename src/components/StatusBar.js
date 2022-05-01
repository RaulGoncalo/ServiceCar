import React from "react";
import { StatusBar } from "react-native";

export default () => {
    return(
        <StatusBar
               hidden = {false}
               backgroundColor = "#221f29"
               translucent = {false}
               networkActivityIndicatorVisible = {true}
            />
    );
}