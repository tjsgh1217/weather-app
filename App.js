import React from 'react';
import axios from "axios";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import Weather from "./Weather";

const API_KEY = "dd923dff235855026c0cc23320dc18e6";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({ isLoading: false, temp: data.main.temp });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "no location.");
    }
  }; 

  componentDidMount() {
    this.getLocation();
  };

  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
};

