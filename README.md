# Contents
* [The package](#react-native-responsive-screen-hooks)
* [Installation](#installation)
* [Usage](#usage)
* [Examples](#examples)
* [How do I know it works for all devices ?](#example)
* [License](#license)
* [Pull Requests](#pull)

# react-native-responsive-screen-hooks

[![npm version](https://badge.fury.io/js/react-native-responsive-screen.svg)](https://www.npmjs.com/package/react-native-responsive-screen-hooks)
[![npm](https://img.shields.io/npm/dm/react-native-responsive-screen.svg)]()

<i>react-native-responsive-screen-hooks</i> is a small library that provides 2 simple methods so that React Native developers can code their UI elements fully responsive. No media queries needed.

It also provides an optional third method for screen orientation detection and automatic rerendering according to new dimensions.

NOTE:
Original Author:- https://www.npmjs.com/package/react-native-responsive-screen
This is the modification of the original library package to extend support for React-Hooks/
Functional Components. There is a slight modification that needs to be done for using this library with React Hooks. Here is the change that needs to be done when you are listening 
for Screen Orientation changes:- 

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

Give it a try and make your life simpler! 

Check out [this medium article](https://medium.com/react-native-training/build-responsive-react-native-views-for-any-device-and-support-orientation-change-1c8beba5bc23) to see the power of the library! 🚀

<img src="https://cdn-images-1.medium.com/max/800/1*BWpx3uRPlWByahoXA6M-BQ.jpeg" />

# Installation

`npm i react-native-responsive-screen-hooks`

OR

`yarn add react-native-responsive-screen-hooks`

Note: Linking not needed. Pod install not needed for iOS.

# Usage
* After the package has installed, when application loads (in real device and/or emulator), it detects the screen's width and height. I.e. for Samsung A5 2017 model it detects `width: 360DP` and `height: 640DP` (these are the values without taking into account the device's scale factor).
* The package exposes 2 basic methods: `widthPercentageToDP` and `heightPercentageToDP`. Their names essentially mean that you can supply a "percentage like" string value to each method and it will return the DP (indipendent pixel) that correspond to the supplied percentage of current screen's width/height respectivelly. I.e. for Samsung A5 2017, if we supply to a CSS box: `width: widthPercentageToDP('53%')`, the rendered style will be `width: 190.8` DP. Check example number 1 for how to use them.
* Methods `widthPercentageToDP` and `heightPercentageToDP` can be used for any style (CSS) property that accepts DP as value. DP values are the ones of type `number` over the props mentioned in RN docs: [View style props](https://facebook.github.io/react-native/docs/view-style-props.html), [Text style props](https://facebook.github.io/react-native/docs/text-style-props.html), [Image style props](https://facebook.github.io/react-native/docs/image-style-props.html), [Layout props](https://facebook.github.io/react-native/docs/layout-props.html) and [Shadow props](https://facebook.github.io/react-native/docs/shadow-props.html). Use the exposed methods for all of the type `number` properties used in your app in order to make your app fully responsive for all screen sizes.
* You can also provide decimal values to these 2 methods, i.e. `font-size: widthPercentageToDP('3.75%')`.
* The package methods can be used with or without flex depending on what you want to do and how you choose to implement it.
* The suggested approach is to start developing from larger screens (i.e. tablets). That way you are less prone to forget adding responsive values for all properties of type `number`. In any case, when your screen development is done, you should test it over a big range of different screens as shown below in the [How do I know it works for all devices ?](#example) section.
* There are 2 more methods to use if you want to support responsiveness along with orientation change. These are `listenOrientationChange` and `removeOrientationListener`. To see how to use them, check example number 3.
* You can use this package along with `styled-components`. To see how to do that, check example number 2.

# Updates 🚀
* `v1.4.0` onwards: The library now has flowtype support. Types should work out of the box, no additional setup needed.
* `widthPercentageToDP` and `heightPercentageToDP` methods accept numeric values as well from version 1.2.1 onwards. That being said a width of 53% can now be written both `width: widthPercentageToDP('53%')` and `width: widthPercentageToDP(53)`.

# Examples

## 1. How to use with StyleSheet.create() and without orientation change support 
```javascript
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen-hooks';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.myText}>Login</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%')   // 80% of width device screen
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  }
});

export default Login;
```
You can find a working example of this over the [related example repository](https://github.com/shubhambathe1/react-native-responsive-screen-hooks/tree/master/examples/responsive-screen/README.md)


## 2. How to use with StyleSheet.create() and with orientation change support
Check the README of the [related example repository](https://github.com/shubhambathe1/react-native-responsive-screen-hooks/tree/master/examples/responsive-screen-orientation-change/README.md)


## 3. How to use with styled components
Check the README of the [related example repository](https://github.com/shubhambathe1/react-native-responsive-screen-hooks/tree/master/examples/responsive-screen-styled-components/README.md)


# How do I know it works for all devices ?

As mentioned in ["How to Develop Responsive UIs with React Native"](https://medium.com/building-with-react-native/how-to-develop-responsive-uis-with-react-native-1x03-a448097c9503) article, this solution is already in production apps and is tested with a set of Android, iOS emulators of different screen specs, in order to verify that we always have the same end result.

## Example:
The 4 blue tiles at the bottom half of the screen should take over 98% of the screen’s width in dp and 10% of the screen’s height in dp always:

### Smartphones
<img src="https://cdn-images-1.medium.com/max/800/1*aoIGDVNrcvIw_4NRqRtHTA.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*Yl9k-Lxg9jxJ9g00qmRlIA.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*rE43O18nt4_ECUvXr_fSZA.png" />

### Tablets
<img src="https://cdn-images-1.medium.com/max/800/1*3uJUPxITidUJAokwB8BokQ.png" />

# License

MIT

# Pull

Pull requests are welcome! Please make the PR to `development` branch though and not `master`. Thanks.
