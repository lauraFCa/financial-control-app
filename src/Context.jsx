
import React, { useState, createContext, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * Context for managing loading state and refreshing state.
 * @typedef {Object} LoadingContext
 * @property {Function} showLoading - Function to show the loading indicator.
 * @property {Function} hideLoading - Function to hide the loading indicator.
 * @property {Function} getShouldRefresh - Function to get the current refresh state.
 * @property {Function} setShouldRefresh - Function to set the refresh state.
 */

const LoadingContext = createContext();

/**
 * Provider component for the LoadingContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [shouldRef, setShouldRef] = useState(false);

    /**
     * Function to show the loading indicator.
     */
    const showLoading = () => setLoading(true);

    /**
     * Function to hide the loading indicator.
     */
    const hideLoading = () => setLoading(false);

    /**
     * Function to get the current refresh state.
     * @returns {boolean} The current refresh state.
     */
    const getShouldRefresh = () => shouldRef;

    /**
     * Function to set the refresh state.
     * @param {boolean} should - The new refresh state.
     */
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

/**
 * Hook for accessing the LoadingContext.
 * @returns {LoadingContext} The LoadingContext.
 * @throws {Error} Throws an error if used outside of a LoadingProvider.
 */
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

/**
 * Component for rendering the loading indicator.
 * @returns {React.ReactNode} The rendered component.
 */
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

