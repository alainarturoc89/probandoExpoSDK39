import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import InsideScreen from '../modules/inside/InsideScreen';

import { InsideStack } from '../types';

export default function InitNavigator() {

    const InsideStack = createStackNavigator<InsideStack>();
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen
                name="InsideScreen"
                component={InsideScreen}
                options={{ headerTitle: (global as any).language.t("modules.inside.inside.module-title") }}
            />
        </InsideStack.Navigator>
    );
}