import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //This is what allows us to use navigation - it's a wrapper around the app
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from './HomeScreen'; // New component made for the home screen
import PersonScreen from './PersonScreen'; // New component made to handle each person's order

const Stack = createNativeStackNavigator();

export default function PaymentSplitApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Payment Split App' }} />
                <Stack.Screen name="Person" component={PersonScreen} options={({ route }) => ({ title: `Person ${route.params.personIndex + 1}` })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
