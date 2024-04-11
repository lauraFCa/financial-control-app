import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import EventsApi from '../../server/events_api';



export default function MapLoadingScreen() {
    const navigation = useNavigation();

    const [currentLocation, setCurrentLocation] = useState();


    async function setLocation() {
        let location = await Location.getCurrentPositionAsync();
        if (location) {
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissão de localização não concedida');
                return;
            }

            await setLocation();
            
            const eventsApi = new EventsApi();
            
            const mycurrentplace = await eventsApi.getCityFromLocationName(currentLocation);

            const eventsList = await eventsApi.getEventsData(mycurrentplace);
            //{ "Nome": title, "Local": loc, "Date": finalDates, "Link": link }

            let eventsListWithLocation = [];
            for (let index = 0; index < eventsList.length; index++) {
                const el = eventsList[index];
                const locale = await eventsApi.getEventCoordinates(el.Local);
                eventsListWithLocation.push({
                    id: index,
                    "Nome do evento": el.Nome,
                    "Local do evento": el.Local,
                    "Local": locale,
                    "Datas": {
                        "Data de inicio do evento": el["Date"].split(" - ")[0],
                        "Data final do evento": el["Date"].split(" - ")[1]
                    },
                    Link: el["Link"]
                });
            };
            
            await new Promise(resolve => setTimeout(resolve, 5400));

            navigation.navigate('EventsMap', 
                { eventsListWithLocation: eventsListWithLocation, currentLocation: currentLocation });

        };

        fetchData();
    })

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center', height: '100%' }}>
            <AntDesign name="loading1" size={24} color="black" />
        </View>
    )
}