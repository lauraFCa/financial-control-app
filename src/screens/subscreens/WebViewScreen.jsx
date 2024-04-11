import WebView from 'react-native-webview';


export default function WebViewScreen({ route }) {
    const { uri } = route.params;
    return (
        <WebView
            source={{ uri: uri }}
            style={{ flex: 1 }}
            onNavigationStateChange={(navState) => {
                if (!navState.canGoBack) {
                    navigation.goBack();
                }
            }}
        />
    );
}