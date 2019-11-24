import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, YellowBox } from 'react-native';
import {Provider} from 'react-redux';
// import { applyMiddleware, createStore,compose } from 'redux';
// import rootReducer from './stores/reducers';
// import thunk from 'redux-thunk';
import AppContainer from './router/router';
import configureStore from './stores/store';
const store = configureStore();


// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {

  //app container provided from router for whole app navigation
  //Provider makes a connection between redux store and app
  render() {
    YellowBox.ignoreWarnings(['Accessing view manager configs directly off UIManager via UIManager[\'AIRMapLite\'] is no longer supported. Use UIManager.getViewManagerConfig(\'AIRMapLite\') instead.']);
    return (
      <Provider store = { store }>
        <AppContainer></AppContainer>
      </Provider>
    );
  }

}


const styles = StyleSheet.create({
  button: {
    color: 'green',
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    //  backgroundColor: '#F7F7FA',
  },
  title: {
    color: 'black',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});

export default App;
