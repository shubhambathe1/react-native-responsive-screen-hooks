This is an example repository that contains a sample setup of react-native-responsive-screen package with support of device orientation changes.

# Usage

In order to detect orientation change, there are 2 differences from the simple case:
* we add a listener function in every screen that supports orientation change (and a remove listener function respectively)
* we move the stylesheet creation inside the render function, so that the styles are recalculated whenever we detect an orientation change (and therefore trigger a rerender).

```javascript
// packages
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';

function App() {

  // TODO: Add a useState for monitoring the orientation of screen
  const [orientation, setOrientation] = React.useState('portrait');

  useEffect(() => {

    // TODO: Pass setter function of useState to the listenOrientationChange as a parameter.
    // In case of class component you need to pass context of class that is 'this' keyword.
    // NOTE: This library will only work for functional component using useEffect
    // For class based component please refer the original library package :-
    // Original Author:- https://www.npmjs.com/package/react-native-responsive-screen
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
    },
    responsiveBox: {
      width: widthPercentageToDP('84.5%'),
      height: heightPercentageToDP('17%'),
      borderWidth: 2,
      borderColor: 'orange',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    text: {
      color: 'white'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.responsiveBox}>
        <Text style={styles.text}>This box is always of 84.5% width and 17% height.</Text>
        <Text style={styles.text}>Test it by running this example repo in phones/
            emulators with screens of various dimensions and pixel per inch (ppi).</Text>
      </View>
    </View>
  );
}

export default App;
```
