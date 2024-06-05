
/**
 * Main component for the application.
 * Renders the navigation stack and provides loading context.
 *
 * @component
 * return (
 *   <Main />
 * )
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingProvider } from './Context';


import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/subscreens/SplashScreen';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import SaveInvestments from './screens/subscreens/SaveInvestment';
import Money from './screens/subscreens/resources/Money';
import Graphs from './screens/subscreens/resources/Graphs';
import InvestmentsCheckbox from './screens/subscreens/InvestmentsCheckbox';
import EventsMap from './screens/subscreens/resources/EventsMap';
import UploadPic from './screens/subscreens/UploadPic';
import ChangeProfilePic from './screens/subscreens/ChangeProfilePic';
import SeePicture from './screens/subscreens/resources/SeePicture';
import MoreOptions from './screens/MoreOptions';
import MapLoadingScreen from './screens/subscreens/resources/MapLoadingScreen';
import TypeOfPic from './screens/subscreens/TypeOfPic';

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
                    <Stack.Screen options={opt} name="MapLoadingScreen" component={MapLoadingScreen} />
                    <Stack.Screen options={opt} name="UploadPic" component={UploadPic} />
                    <Stack.Screen options={opt} name="ChangeProfilePic" component={ChangeProfilePic} />
                    <Stack.Screen options={opt} name="SeePicture" component={SeePicture} />
                    <Stack.Screen options={opt} name="MoreOptions" component={MoreOptions} />
                    <Stack.Screen options={opt} name="TypeOfPic" component={TypeOfPic} />
                </Stack.Navigator>
            </LoadingProvider>
        </NavigationContainer>
    );
}
