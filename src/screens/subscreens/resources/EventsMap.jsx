import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64

export default function EventsMap({ route, navigation }) {
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

    const bottomSheetRef = useRef(null);

    const handleClosePress = () => bottomSheetRef.current?.close();
    const snapeToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );


    const [eventsList, setEventsList] = useState([]);

    const [currentLocation, setCurrentLocation] = useState();

    const [eventData, setEventData] = useState({
        dates: "",
        place: "",
        link: ""
    });



    useEffect(() => {
        makeAsyncCalls = async () => {
            console.log("make async calls")
            
            if (route.params) {
                setEventsList(route.params.eventsListWithLocation);
                setCurrentLocation(route.params.currentLocation);
            }
            
            console.log("finish");
        }

        makeAsyncCalls();
        
    }, []);



    return (
        <View>
            <View style={{ marginTop: statusBarHeight, height: '100%' }}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={currentLocation}>
                        {eventsList.map(location => (
                            <Marker
                                key={location.id}
                                coordinate={{ latitude: location.Local.latitude, longitude: location.Local.longitude }}
                                title={location["Nome do evento"]}
                                onPress={() => { setEventData({
                                    dates: location.Datas["Data de inicio do evento"] + "\n" + location.Datas["Data final do evento"],
                                    place: location["Local do evento"],
                                    link: location.Link
                                }); 
                                snapeToIndex(0); 
                                }}
                            >
                            </Marker>
                        ))}
                    </MapView>
                </View>

                <View style={styles.homeBtnView}>
                    <TouchableOpacity
                        style={styles.homeBtn}
                        onPress={() => {
                            navigation.navigate('MoreOptions');
                        }}>
                        <MaterialIcons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                handleIndicatorStyle={{ backgroundColor: '#353535' }}
                backgroundStyle={{ backgroundColor: '#c5c5c5' }}
                backdropComponent={renderBackdrop}>
                <View style={styles.contentContainer}>
                    <Text style={styles.containerHeadline}>{eventData.place}</Text>
                    <Text style={styles.containerHeadline}>{eventData.dates}</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('WebViewScreen', eventData.link)}>
                        <Text>Mais informações</Text>
                    </TouchableOpacity>
                    <Text style={styles.containerHeadline}>{eventData.link}</Text>
                    <TouchableOpacity onPress={handleClosePress}>
                        <Text style={styles.txt}>Close</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    containerHeadline: {
        fontSize: 20,
    },
    txt: {
        marginTop: 15,
        padding: 8,
        borderWidth: 1,
        borderColor: 'darkgrey',
        textAlign: 'center'
    }
});
