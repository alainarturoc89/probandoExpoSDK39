import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../modules/common/not_found/NotFoundScreen';
import HelpScreen from '../modules/common/help/HelpScreen';

import { CommonStack } from '../types';

export default function InitNavigator() {

    const CommonStack = createStackNavigator<CommonStack>();
    return (
        <CommonStack.Navigator>
            <CommonStack.Screen name="NotFound" component={NotFoundScreen}
                options={{ headerTitle: (global as any).language.t("modules.common.not_found.module-title") }} />
            <CommonStack.Screen name="Help" component={HelpScreen}
                options={{ headerTitle: (global as any).language.t("modules.common.help.module-title") }}
            />
        </CommonStack.Navigator>
    );
}