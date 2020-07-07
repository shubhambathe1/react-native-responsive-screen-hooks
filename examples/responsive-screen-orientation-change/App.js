// packages
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';

export default function App() {

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
