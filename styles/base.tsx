import { Dimensions } from 'react-native';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    primary: '#226B74',
    secondary: '#254B5A',
    tertiary: '#5DA6A7'
}
export const isSmallDevice = Dimensions.get('window').width < 375