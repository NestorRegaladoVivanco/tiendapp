import React from 'react';
import type {Node} from 'react';

/*
Todas las librerias que se ocupan:

npm install react-email-validator
npm install react-native-select-dropdown
npm install react-native-maps
npm install react-native-maps-directions
npm install react-native-places-input
npm install react-native-loading-spinner-overlay

npm install react-native-dotenv
npm install metro-react-native-babel-preset --save-dev
-------------------------------------------------------------------
Agregar esto en android/app/src/main/res/AndroidManifest.xml
<application
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="GOOGLE_MAPS_KEY"/>

y agregar esto en el babel.config.js
plugins:[
    [
      'module:react-native-dotenv',
      {
        moduleName:"@env",
        path:".env"
      },
    ],
  ],

*/

import LOGIN from "./Menu";
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App: () => Node = () => {

  return (
    <LOGIN />
  );
};

export default App;
