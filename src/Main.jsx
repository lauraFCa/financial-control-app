import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingProvider } from './Context';


import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/subscreens/SplashScreen';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import SaveInvestments from './screens/subscreens/SaveInvestment';
import Money from './screens/Money';
import Graphs from './screens/Graphs';
import InvestmentsCheckbox from './screens/subscreens/InvestmentsCheckbox';
import EventsMap from './screens/EventsMap';

const Stack = createStackNavigator();


export default function Main() {


    let opt = {
        headerShown: false
    }

    return (
        <NavigationContainer>
            <LoadingProvider>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen options={opt} name="Auth" component={AuthScreen} />
                    <Stack.Screen options={opt} name="Home" component={Home} />
                    <Stack.Screen options={opt} name="Profile" component={Profile} />
                    <Stack.Screen options={opt} name="Settings" component={Settings} />
                    <Stack.Screen options={opt} name="SaveInvestments" component={SaveInvestments} />
                    <Stack.Screen options={opt} name="Graphs" component={Graphs} />
                    <Stack.Screen options={opt} name="Money" component={Money} />
                    <Stack.Screen options={opt} name="Splash" component={SplashScreen} />
                    <Stack.Screen options={opt} name="checkbox" component={InvestmentsCheckbox} />
                    <Stack.Screen options={opt} name="map" component={EventsMap} />
                </Stack.Navigator>
            </LoadingProvider>
        </NavigationContainer>
    );
}
