import React, { useState, createContext, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [shouldRef, setShouldRef] = useState(true)

    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);


    const getShouldRefresh = () => shouldRef;
    const setShouldRefresh = (should) => setShouldRef(should);

    return (
        <LoadingContext.Provider value={{
            showLoading, hideLoading,
            getShouldRefresh, setShouldRefresh
        }}>
            {children}
            {loading && <LoadingIndicator />}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

const LoadingIndicator = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

