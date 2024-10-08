import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const AcasaScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Ensure StatusBar is visible */}
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
            
            <View style={styles.content}>
                <Text>Acasa Screen</Text>
            </View>
        </SafeAreaView>
    );
}

export default AcasaScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Match the background to the StatusBar color
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
