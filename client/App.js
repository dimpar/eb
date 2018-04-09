import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import {StatusBar, Text} from 'react-native';
import awsmobile from './src/aws-exports';
import ToDoList from "./src/screens/ToDoList";
import Home from "./src/screens/Home";
import {connect} from 'react-redux'
import AuthHomeNav from "./src/nav/AuthHomeNav";
import EbNav from "./src/nav/EbNav";

Amplify.configure(awsmobile);

class App extends React.Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    render() {
        let loggedIn = false;
        console.log("Auth.user ", Auth.user);
        if (Auth.user) {
            const {user: {signInUserSession: {accessToken: {payload: {exp, iat}}}}} = Auth
            if (iat < exp) loggedIn = true;
        }
        // loggedIn = true; //temp
        if (loggedIn) {
            console.log("App.js logged in", loggedIn);
            return (

                <EbNav/>
                // <Home/>
            )
        }
        console.log("App.js not logged in");
        return (
            <AuthHomeNav/>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App)


