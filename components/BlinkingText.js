import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const BlinkingText = props => {
  const [showText, setShowText] = useState(true);
  const text = showText ? props.text : ' ';

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(previousShowText => !previousShowText);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.orange,
    fontSize: 40,
  },
});

export default BlinkingText;
