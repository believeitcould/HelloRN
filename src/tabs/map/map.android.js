import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	Button
} from 'react-native'


export default class Map extends Component {

	constructor() {
		super()
		this.state = {
			latitude: 37.78825,
			longitude: -122.4324
		}
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((res) => {
			this.setState({
				latitude: res.coords.latitude,
				longitude: res.coords.longitude
			}, this._moveToSelf)
		})
	}

	render() {
		return (
            <View style={styles.container}>
                
				<Text>
				Google Map 不支持国内Android
				</Text>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
})