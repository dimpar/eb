import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import {StatusBar} from 'react-native';
import awsmobile from './src/aws-exports';
import {connect} from 'react-redux'
import AuthHomeNav from "./src/nav/AuthHomeNav";
import TabNav from "./src/nav/EbTabNav";
import {AppLoading, Font} from 'expo';
import {FontAwesome} from '@expo/vector-icons';

Amplify.configure(awsmobile);

class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    async componentDidMount() {
        StatusBar.setHidden(true);
    }

    render() {
        if (!this.state.isLoadingComplete) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {

            let loggedIn = false;
            console.log("Auth.user ", Auth.user);
            if (Auth.user) {
                const {user: {signInUserSession: {accessToken: {payload: {exp, iat}}}}} = Auth
                if (iat < exp) loggedIn = true;
            }
            loggedIn = true;
            if (loggedIn) {
                return (
                    <TabNav/>
                )
            }

            return (
                <AuthHomeNav/>
            )

        }

    }

    _loadResourcesAsync = async () => {
        console.log("loading fonts");
        return Promise.all([
            Font.loadAsync({
                ...FontAwesome.font,
                'base': require('./src/assets/fonts/Lato-Regular.ttf'),
                'hairline': require('./src/assets/fonts/Lato-Hairline.ttf'),
                'light': require('./src/assets/fonts/Lato-Light.ttf'),
                'bold': require('./src/assets/fonts/Lato-Bold.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        console.warn("Error occured while loading", error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App)


