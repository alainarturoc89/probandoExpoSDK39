import * as Linking from 'expo-linking';

export default {

  prefixes: [Linking.makeUrl('/')],

  config: {

    screens: {

      Common: {

        screens: {

          Help: 'help',

          NotFound: '*',

        }

      },

      Inside: {

        screens: {

          Inside: 'inside',

        }

      },

      Outside: {

        screens: {

          Login: 'login',

          Init: 'init',

        },

      },

    },

  },

};
