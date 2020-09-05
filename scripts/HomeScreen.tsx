import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import { Image, Text, View, Button, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import uploadToAnonymousFilesAsync from "anonymous-files";
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { styles } from "./styles";

const logo = require("../assets/images/logo.png")

interface HomeScreenProps {
    navigation: StackNavigationProp<any, any>;
  }
  
export class HomeScreen extends Component<HomeScreenProps> {
    state = { localUri: "", remoteUri: "" };

    constructor(props: HomeScreenProps) {
        super(props)
    }

    render() {
        if (this.state.localUri !== "") {
            return (
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.localUri }}
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
            this.setState({ localUri: pickerResult.uri, remoteUri: "" });
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
                <Text> I am {this.props.name}, an I am {this.state.isHungry ? "hungry" : "full"}! </Text>
                <Button
                    onPress={() => { this.setState({ isHungry: false }); }}
                    disabled={!this.state.isHungry}
                    title={this.state.isHungry ? "Pour me some milk, please!" : "Thank you!"} />
            </View>
        );
    }
}
