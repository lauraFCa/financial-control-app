import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingProvider } from './Context';


import Home from './screens/Home';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Investments from './screens/subscreens/Investments'
import SaveInvestments from './screens/subscreens/SaveInvestment';

import AuthScreen from './screens/AuthScreen';
import Graphs from './screens/Graphs';
import Money from './screens/Money';
import SplashScreen from './screens/subscreens/SplashScreen';

const Stack = createStackNavigator();


export default function Main() {


    let opt = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff',
        },
        headerShown: false
    }


    return (
        <NavigationContainer>
            <LoadingProvider>
                <Stack.Navigator initialRouteName="Auth" screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen options={opt} name="Auth" component={AuthScreen} />
                    <Stack.Screen options={opt} name="Home" component={Home} />
                    <Stack.Screen options={opt} name="Profile" component={Profile} />
                    <Stack.Screen options={opt} name="Settings" component={Settings} />
                    <Stack.Screen options={opt} name="Investments" component={Investments} />
                    <Stack.Screen options={opt} name="SaveInvestments" component={SaveInvestments} />
                    <Stack.Screen options={opt} name="Graphs" component={Graphs} />
                    <Stack.Screen options={opt} name="Money" component={Money} />
                    <Stack.Screen options={opt} name="Splash" component={SplashScreen} />
                </Stack.Navigator>
            </LoadingProvider>
        </NavigationContainer>
    );
}
