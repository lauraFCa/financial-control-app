import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import FindEvents from '../server/events.js';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64

export default function EventsMap({ navigation }) {

    const [locations, setLocations] = useState([
        { id: 1, title: 'Local 1', latitude: -21.7642, longitude: -43.3496 },//jf
        { id: 2, title: 'Local 2', latitude: 37.771707, longitude: -122.405376 },
        { id: 3, title: 'Local 3', latitude: 37.7749, longitude: -122.4194 },
    ]);

    const [currentLocation, setCurrentLocation] = useState();


    async function setLocation() {
        let location = await Location.getCurrentPositionAsync();
        console.log(location)
        if(location){
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }

    useEffect(() => {
        console.log("########useeffect##############\n")

        makeAyncCalls = async () => {
            console.log("make async calls")

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissão de localização não concedida');
                return;
            }

            await setLocation();
            console.log("current location")
            console.log(currentLocation)
            if (!currentLocation) {
                console.log("in if")
                await setLocation();
            }
            console.log(currentLocation)


            let newPoints = []
            const events = new FindEvents(currentLocation.latitude, currentLocation.longitude);
            const closestEvents = events.findClosestEvents();
            closestEvents.forEach((element, indx) => {
                console.log(element);
                console.log(element.Local);
                
                newPoints.push({
                    id: indx,
                    title: element["Nome do evento"],
                    latitude: element.Local.latitude,
                    longitude: element.Local.longitude
                });
            });
            newPoints.push({
                id: newPoints.length + 1,
                title: "Inital Loc",
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
            })
            console.log(newPoints);
            setLocations(newPoints);
        }

        makeAyncCalls();


    }, []);


    return (
        <View style={{ marginTop: statusBarHeight, height: '100%' }}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: -21.7642,
                        longitude: -43.3496,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {locations.map(location => (
                        <Marker
                            key={location.id}
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title={location.title}
                        />
                    ))}
                </MapView>
            </View>
            <View style={styles.homeBtnView}>
                <TouchableOpacity
                    style={styles.homeBtn}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}>
                    <MaterialIcons name="home" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homeBtnView: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 80,
        right: 10,
    },
    homeBtn: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'darkblue',
    },
    backBtnView: {
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 80,
        left: 10,
    },
    backBtn: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'darkblue',
    },
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
