import { registerRootComponent } from 'expo';
import App from './App';
import React from 'react'
import 'expo'

// redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk));

// Amplify
import config from './src/aws-exports'
import Amplify from 'aws-amplify'
Amplify.configure(config);

// App
// How we read / write states from the main application?
const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

registerRootComponent(ReduxApp);
