import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Platform, Button, Animated, StyleProp } from 'react-native';
// import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import 'react-native-gesture-handler'
import { NavigationContainer, NavigationContainerProps, StackNavigationState } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

const logo = require("./assets/logo.png")
const Stack = createStackNavigator();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize:20,
    color:'#fff',
  },
  thumbnail: {
    width:300,
    height:300,
    resizeMode:"contain",
  },
});

// class Greeting extends Component {
//   render() {
//     return (
//       <View style={{alignItems: 'center'}}>
//         <Text>Hello {this.props.name}!</Text>
//       </View>
//     );
//   }
// }

// class LotsOfGreetings extends Component {
//   render() {
//     return (
//       <View style={{ alignItems: 'center', top: 50 }}>
//         <Greeting name="asd" />
//         <Greeting name="aqwe" />
//         <Greeting name="Zxc" />
//       </View>
//     )
//   }
// }

interface CatProps {
  name: string;
}
interface CatState {
  isHungry: boolean;
}

class Cat extends Component<CatProps, CatState> {
  state = { isHungry: true };
  render() {
    return (
      <View>
        <Text>
          I am {this.props.name}, an I am
          {this.state.isHungry ? "hungry" : "full"}!
        </Text>
        <Button
          onPress={() => { this.setState({ isHungry: false }); }}
          disabled={!this.state.isHungry}
          title={this.state.isHungry ? "Pour me some milk, please!" : "Thank you!"}/>
      </View>
    );
  }
}

// const HomeScreen = ({navigation}) => {
//   return (
//     <Button
//       title="asdasd"
//       onPress={() =>
//         navigation.navigate
//       }
//   );
// }

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

interface HomeScreenProps {
  navigation: StackNavigationProp<any, any>;
}

class HomeScreen extends Component<HomeScreenProps> {
  state = { localUri: "", remoteUri: "" };

  constructor(props: HomeScreenProps) {
    super(props)
  }

  render() {
    if (this.state.localUri !== "") {
      return (
        <View style={styles.container}>
          <Image
            source={{uri: this.state.localUri}}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={this.openShareDialogAsync} style={styles.button}>
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={logo} style={styles.logo} />
        {/* <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={{ width: 305, height: 159 }} /> */}
        <Text style={styles.instructions}>
          To share a phto from your phone with a friend, just press the button below!
        </Text>
        <TouchableOpacity
          onPress={this.openImagePickerAsync}
          style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
        <Cat name="ssdf" />
        <Cat name="asd" />
        <Button
          title="go to details"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
      </View>
    );
  }
  
  async openImagePickerAsync() {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true)
      return;

    // setSelectedImage({ localUri: pickerResult.uri });
    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      this.setState({ localUri: pickerResult.uri, remoteUri });
      // setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    }
    else {
      this.setState({ localUri: pickerResult.uri, remoteUri: ""  });
      // setSelectedImage({ localUri: pickerResult.uri, remoteUri: "" });
    }

  };

  async openShareDialogAsync() { //= async() => {
    if (!(await Sharing.isAvailableAsync())) {
      // alert("Uh oh, sharing isn't available on your platform");
      alert('This image is available for sharing at: ${selectedImage.remoteUri}');
      return;
    }

    // await Sharing.shareAsync(selectedImage.localUri);
    await Sharing.shareAsync(this.state.localUri);
  };
}

type DetailScreenProps = {
  navigation: StackNavigationProp<any, any>
}

class DetailScreen extends Component<DetailScreenProps> {
  render() {
    return (
      <View>
        <Text>Detail Screen</Text>
        <Button 
          title="Go to detail again!"
          onPress={()=>this.props.navigation.push('Detail')}
        />
        <FadeInView style={{width:250, height:50, backgroundColor:'powderblue'}}>
          <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
        </FadeInView>
      </View>
    );
  }
}

// https://reactnative.dev/docs/animations
interface FadeInViewProps {
  style: StyleProp<any>//{ width: number, height: number, backgroundColor: string }
  children: React.ReactNode
}

// 클래스 버전.
class FadeInView extends Component<FadeInViewProps> {
  fadeAnim = new Animated.Value(0)
  render() {
    Animated.timing(
      this.fadeAnim,
      {
        useNativeDriver: true,
        toValue:1,
        duration: 10000,
      }
    ).start();

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: this.fadeAnim,
        }}>
      {this.props.children}
      </Animated.View>
    );
  }
}

// 함수 버전.
// const FadeInView = (props:FadeInViewProps) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

//   React.useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         useNativeDriver: true,
//         toValue: 1,
//         duration: 10000,
//       }
//     ).start();
//   }, [fadeAnim])

//   return (
//     <Animated.View                 // Special animatable View
//       style={{
//         ...props.style,
//         opacity: fadeAnim,         // Bind opacity to animated value
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }