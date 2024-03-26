import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import EventsApi from '../server/events';



export default function EventsMap() {

    const [locations, setLocations] = useState([
        { id: 1, title: 'Local 1', latitude: -21.7642, longitude: -43.3496 },//jf
        { id: 2, title: 'Local 2', latitude: 37.771707, longitude: -122.405376 },
        { id: 3, title: 'Local 3', latitude: 37.7749, longitude: -122.4194 },
    ]);

    useEffect(() => {
        const eventsApi = new EventsApi();
        const makerequest = async () => {
            const json = await eventsApi.getEventsData("juiz-de-fora-mg");
            const data = await eventsApi.getEventsDetails(json);
            if (data) {
                setLocations(data);
            }
        };
        makerequest();
    }, []);


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
