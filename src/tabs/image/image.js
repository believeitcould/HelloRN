import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	ListView,
	Image,
	Dimensions,
	TouchableWithoutFeedback,
	RefreshControl,
	Platform
} from 'react-native'

import { Actions } from 'react-native-router-flux'

import LoadingSpinner from '../../components/loadingSpinner'
import ImageModal from '../../components/imageModal'

let deviceWidth = Dimensions.get('window').width

const ImageItem = ({ url, images, rowID, t }) => {
	let gif = url.endsWith('.gif'), newUrl = url
	if (gif) newUrl = url.replace('mw690','small')
					  .replace('mw1024','small')
					  .replace('mw1200','small')

	return (
		<TouchableWithoutFeedback onPress={() => {t.setState({modalUri: url, modalHide: false})}}>
			<View style={{padding: 10, margin: 10, borderRadius: 5, backgroundColor: '#FFF'}}>
				<Image 
					style={{
						flex: 1,
						height: 200,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					resizeMethod='scale'
					source={{uri: newUrl}}
				>
				<Text
					style={{
						backgroundColor: 'transparent',
						color: '#FFF',
						fontSize: 18
					}}
				>
						{gif && 'PLAY'}
					</Text>
				</Image>
				
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
			isRefreshing: false,
			currentPage: 1,
			modalUri: '',
			modalHide: true
		}
	}

	componentDidMount() {
		this._fetchImages()
	}
	
	_fetchImages(page = 1, callback) {
		let url = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=' + page
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				let tmp = page == 1 ? [] : this.state.images
				res.comments.forEach((ele, index, arr) => {
					tmp = tmp.concat(ele.pics)
				})
				console.log(tmp.length)
				// let ds = page == 1 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) : this.state.imageDS
				this.setState({
					imageDS: this.state.imageDS.cloneWithRows(tmp),
					images: tmp,
					currentPage: page
				}, callback && callback())
			})
	}

	_onRefresh() {
		this.setState({isRefreshing: true})
		// setTimeout(()=>this.setState({isRefreshing: false}),2000)
		this._fetchImages(1,this.setState({isRefreshing: false}))
	}

	_onLoadMore() {
		let page = ++this.state.currentPage
		console.log(page)
		this._fetchImages(page)
	}

	render() {
		if (this.state.images.length == 0) return <LoadingSpinner animating={true} />
		return (
            <View style={styles.container}>
				<ListView
					dataSource={this.state.imageDS}
					renderRow={(rowData, sectionID, rowID) => 
						<ImageItem url={rowData} images={this.state.images} key={rowID} rowID={rowID} t={this} />
					}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={() => this._onRefresh()}
							tintColor='#FFDB42'
							title='拼命加载中'
							titleColor="black"
							colors={['black']}
							progressBackgroundColor="#FFDB42"
						/>
					}
					onEndReachedThreshold={250}
					onEndReached={() => this._onLoadMore()}
				/>
				<ImageModal
					uri={this.state.modalUri}
					hide={this.state.modalHide}
					onPress={()=>this.setState({modalHide: true})}
				/>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 60 : 54,
		paddingBottom: 50,
		backgroundColor: '#EEE'
	},
})