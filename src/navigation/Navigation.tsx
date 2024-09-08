import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../screens/SplashScreen'
import BaymaxScreen from '../screens/BaymaxScreen'
import { navigationRef } from '../utils/NavigationUtils'
const Stack = createNativeStackNavigator()
const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName='Splash'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='Splash' component={SplashScreen} />
                <Stack.Screen name='Baymax'
                options={{
                    animation: 'fade'
                }}
                component={BaymaxScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation