import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	ListView,
	Image,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native'

import LoadingSpinner from '../components/loadingSpinner'

let deviceWidth = Dimensions.get('window').width

const ImageItem = ({ url }) => {
	let gif = url.endsWith('.gif')
	if (gif) url = url.replace('mw690','small')
					  .replace('mw1024','small')
					  .replace('mw1200','small')

	return (
		<TouchableWithoutFeedback>
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				<Image 
					style={{width: deviceWidth, height: 200}}
					resizeMode='cover'
					source={{uri: url}}
				/>
				{
					gif ?
					<Text
						style={{
							position: 'absolute',
							backgroundColor: 'transparent',
							color: '#FFF',
							fontSize: 18,
							left: deviceWidth / 2 - 20,
							top: 90
						}}
					>
						PLAY
					</Text>
					:
					null
				}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default class Images extends Component {

	constructor() {
		super()
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			imageDS: ds,
			images: [],
		}
	}

	componentDidMount() {
		let url = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page='
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				let tmp = this.state.images
				res.comments.forEach((ele, index, arr) => {
					tmp = tmp.concat(ele.pics)
				})
				console.log(tmp)
				this.setState({
					imageDS: this.state.imageDS.cloneWithRows(tmp),
					images: tmp
				})
			})
	}

	render() {
		if (this.state.images.length == 0) return <LoadingSpinner animating={true} />
		return (
            <View style={styles.container}>
				<ListView
					dataSource={this.state.imageDS}
					renderRow={(rowData, sectionID, rowID) => <ImageItem url={rowData} key={rowID} />}
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