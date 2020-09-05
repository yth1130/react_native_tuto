import { StyleProp, Animated } from "react-native";
import React, { Component } from "react";

// https://reactnative.dev/docs/animations
export interface FadeInViewProps {
    style: StyleProp<any>//{ width: number, height: number, backgroundColor: string }
    children: React.ReactNode
}
  
  // 클래스 버전.
export class FadeInView extends Component<FadeInViewProps> {
    fadeAnim = new Animated.Value(0)
    render() {
        Animated.timing(
            this.fadeAnim,
            {
                useNativeDriver: true,
                toValue: 1,
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
  
  