import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/core";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Colors from "../../../../styles/abstracts/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {GOOGLE_API_KEY} from "@env";

const GigLocation = ({distance, address, willSellerDeliver, geoData}) => {
  const navigation = useNavigation();
  const [myLocation, setMyLocation] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const delta = {latitudeDelta: 0.01, longitudeDelta: 0.01};

  useEffect(() => {
    const getMyLocation = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("mylocation");
        if (jsonValue != null) {
          const obj = JSON.parse(jsonValue);
          setMyLocation(obj);
          console.log("consumer location not null", obj);
          try {
            const config = {
              method: "get",
              url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${obj.latitude},${obj.longitude}&destinations=${geoData.latitude},${geoData.longitude}&key=${GOOGLE_API_KEY}`,
              headers: {},
            };
            axios(config)
              .then(response => {
                // console.log(JSON.stringify(response.data));
                console.log(response.data.rows[0].elements[0]);
                setRouteData(response.data.rows[0].elements[0]);
              })
              .catch(error => {
                console.log(error);
              });
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("location null");
        }
      } catch (e) {
        console.error(e);
      }
    };
    getMyLocation();
  }, []);

  // useEffect(() => {

  // }, []);

  return (
    <View>
      <View style={styles.addressRow}>
        <MaterialIcon color={Colors.fontColor.color} size={25} name="map-marker" />
        <View style={styles.addresRight}>
          <View style={styles.locationRow}>
            <Text style={{fontWeight: "bold"}}>{distance}</Text>
            <TouchableOpacity>
              <Text
                style={styles.viewOnMap}
                onPress={() =>
                  navigation.navigate("ConsumerMap", {
                    marker: geoData,
                    myLocation,
                    routeData,
                  })
                }>
                View on map
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.deliverMethod}>
              {willSellerDeliver === true
                ? `Seller will deliver to you`
                : `You will get the order at seller`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GigLocation;

const styles = StyleSheet.create({
  addressRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  addresRight: {
    marginLeft: 10,
  },
  locationRow: {
    flexDirection: "row",
  },
  viewOnMap: {
    marginLeft: 15,
    marginBottom: 5,
    color: Colors.secondary.color,
    textDecorationLine: "underline",
  },
  address: {
    color: Colors.fontColor.color,
    marginBottom: 5,
  },
  deliverMethod: {
    fontWeight: "bold",
    color: Colors.fontColor.color,
  },
});
