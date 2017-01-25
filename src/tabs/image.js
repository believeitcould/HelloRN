import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View
} from 'react-native'

export default class Image extends Component {
	render() {
		return (
            <View>
                <Text> image </Text>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
})