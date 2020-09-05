import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Platform, Button, Animated, StyleProp } from 'react-native';
// import logo from './assets/logo.png';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from './scripts/HomeScreen';
import { DetailScreen } from './scripts/DetailScreen';

const Stack = createStackNavigator();

// 화면 탐색 : https://reactnative.dev/docs/navigation, https://reactnavigation.org/docs/4.x/navigating
export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Welcome!' }}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={DetailScreen}
                    // options={{ title: "hoho" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



// export default function App() {
//   const [selectedImage, setSelectedImage] = React.useState({ localUri: "", remoteUri: "" });
//   // const [selectedImage, setSelectedImage] = React.useState<ImagePicker.ImagePickerResult | null>(null);

//   let openImagePickerAsync = async() => {
//     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync();
//     console.log(pickerResult);

//     if (pickerResult.cancelled === true)
//       return;

//     // setSelectedImage({ localUri: pickerResult.uri });
//     if (Platform.OS === 'web') {
//       let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
//       setSelectedImage({ localUri: pickerResult.uri, remoteUri });
//     }
//     else {
//       setSelectedImage({ localUri: pickerResult.uri, remoteUri: "" });
//     }

//   };

//   let openShareDialogAsync = async() => {
//     if (!(await Sharing.isAvailableAsync())) {
//       // alert("Uh oh, sharing isn't available on your platform");
//       alert('This image is available for sharing at: ${selectedImage.remoteUri}');
//       return;
//     }

//     await Sharing.shareAsync(selectedImage.localUri);
//   }

//   if (selectedImage.localUri !== "") {
//     return (
//       <View style={styles.container}>
//         <Image
//           source={{uri: selectedImage.localUri}}
//           style={styles.thumbnail}
//         />
//         <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
//           <Text style={styles.buttonText}>Share this photo</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name="Home"
//           component={HomeScreen}
//           options={{title: 'Welcome!'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }