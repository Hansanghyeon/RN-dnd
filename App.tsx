import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { Animated, View, PanResponder, Text } from 'react-native';

import styled from 'styled-components/native';

export default function App() {
  const pan: any = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ]),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start()
    }
  })).current;
  return (
    <Container>
      <Title>Drag & Release this box!</Title>
      <Animated.View style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }} {...panResponder.panHandlers}>
        <Box />
      </Animated.View>
      <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
`;

const Box = styled(View)`
  height: 150px;
  width: 150px;
  background-color: blue;
  border-radius: 4px;
`;