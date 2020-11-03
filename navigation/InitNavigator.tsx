import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import InitScreen from '../modules/init/InitScreen';

import { Init } from '../types';

export default function InitNavigator() {

  const InitStack = createStackNavigator<Init>();
  return (
    <InitStack.Navigator>
      <InitStack.Screen
        name="InitScreen"
        component={InitScreen}
        options={{ headerTitle: 'Componente inicial' }}
      />
    </InitStack.Navigator>
  );
}