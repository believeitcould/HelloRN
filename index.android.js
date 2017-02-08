/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Main from './src/main'

export default class HelloRN extends Component {
	render() {
		return (
			<Main />
		)
	}
}

const styles = StyleSheet.create({
  
})

AppRegistry.registerComponent('HelloRN', () => HelloRN);
