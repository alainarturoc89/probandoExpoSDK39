import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import InitScreen from '../modules/outside/init/InitScreen';
import LoginScreen from '../modules/outside/login/Login';

import { OutsideStack } from '../types';

export default function InitNavigator() {

  const OutsideStack = createStackNavigator<OutsideStack>();
  return (
    <OutsideStack.Navigator initialRouteName="Login">
      <OutsideStack.Screen
        name="Init"
        component={InitScreen}
        options={{ headerTitle: (global as any).language.t("modules.outside.init.module-title") }}
      />
      <OutsideStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: (global as any).language.t("modules.outside.login.module-title") }}
      />
    </OutsideStack.Navigator>
  );
}