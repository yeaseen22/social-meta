import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FollowingTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Following Tab Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FollowingTab;

