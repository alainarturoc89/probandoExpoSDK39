import * as React from 'react';

import { Text, TextProps } from './Elements';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
