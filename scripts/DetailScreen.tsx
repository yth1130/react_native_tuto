import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { FadeInView } from "./FadeInView";

type DetailScreenProps = {
    navigation: StackNavigationProp<any, any>
}

export class DetailScreen extends Component<DetailScreenProps> {
    render() {
        return (
            <View>
                <Text>Detail Screen</Text>
                <Button
                    title="Go to detail again!"
                    onPress={() => this.props.navigation.push('Detail')}
                />
                <FadeInView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
                    <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
                </FadeInView>
            </View>
        );
    }
}
