import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	Button
} from 'react-native'

import MapView from 'react-native-maps'

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
			},this._moveToSelf)
		})
	}

	_moveToSelf() {
		this.refs.mapview.animateToCoordinate({
			latitude: this.state.latitude,
			longitude: this.state.longitude,
		}, 500)
	}

	render() {
		return (
            <View style={styles.container}>
                <MapView
					showsUserLocation
					style={{flex: 1}}
					ref='mapview'
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
				<Button
					onPress={() =>this._moveToSelf()}
					title="我的位置"
					color="#841584"
				/>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		paddingBottom: 50
	},
})