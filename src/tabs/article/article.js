import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
	Dimensions,
  	Text,
  	View,
	Image,
	ListView,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	CameraRoll,
	Animated
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import SwipeableViews from 'react-swipeable-views-native'
import { autoPlay } from 'react-swipeable-views-utils'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-root-toast'
// import Slider from 'react-native-slider'

import LoadingSpinner from '../../components/loadingSpinner'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

let deviceWidth = Dimensions.get('window').width



const ListItem = ({ data }) => {
	return (
		<TouchableOpacity style={styles.listItem} onPress={() => Actions.articleContent({articleID: data.id})}>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.itemTitle} numberOfLines={2}>
					{data.title}
				</Text>
				<Image
					style={styles.itemImage}
					source={{uri: data.images[0]}}
				/>
			</View>
		</TouchableOpacity>
	)
}

export default class Article extends Component {

	constructor() {
		super()
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			stories: ds,
			topStories: [],
			modalSize: new Animated.Value(.5),
			modalOpacity: new Animated.Value(0),
			modalHide: true
		}
  	}

	componentDidMount() {
		// console.log(this.refs.swiper)
		// 知乎日报首页 api
		// let url = 'http://news-at.zhihu.com/api/4/news/latest'
		// fetch(url)
		// 	.then((data) => {
		// 		return data.json()
		// 	})
		// 	.then((res) => {
		// 		console.log(res.stories)
		// 		this.setState({
		// 			stories: this.state.stories.cloneWithRows(res.stories),
		// 		})
		// 		this._swiperViews(res.top_stories)
		// 	})
		// this.state.bounceValue.setValue(1.0)
		
		
	}

	_swiperViews(topStories) {
		let views = []
		topStories.forEach((ele, index, arr) => {
			views.push(
				<TouchableWithoutFeedback onPress={() => Actions.articleContent({articleID: ele.id})}>
				<View style={[styles.slide, styles.slide1]}>
					<Text style={styles.slideTitle}>
						{ele.title}
					</Text>
					<Image
						style={{zIndex: -1, position: 'absolute', width: deviceWidth, height: 200}} 
						source={{uri: ele.image}}
						resizeMode='cover'
					/>
				</View>
				</TouchableWithoutFeedback>
			)
		})
		this.setState({
			topStories: views
		})
	}

	_renderModal() {
		const animatedDuration = 400
		let animated, modalSize = .5, modalOpacity = 0.0
		if (this.state.modalHide) {
			modalSize = 1.0,
			modalOpacity = 1.0
		}
		animated = Animated.parallel([
			Animated.timing(this.state.modalSize,{
				toValue: modalSize,
				duration: animatedDuration,
			}),
			Animated.timing(this.state.modalOpacity,{
				toValue: modalOpacity,
				duration: animatedDuration,
			})
		])
		
		animated.start(() => this.setState({modalHide: !this.state.modalHide}))
					
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={() => this._renderModal()}
				>
				<Image
					source={{uri: 'http://wx3.sinaimg.cn/mw600/006GlaT2ly1fcgte21y1zj30m90xcn4a.jpg'}}
					style={{width: 200, height: 200}}
				/>
				</TouchableWithoutFeedback>
				
				<Animated.View                         // 可选的基本组件类型: Image, Text, View
					style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 100000,
					opacity: this.state.modalOpacity,
					transform: [                        // `transform`是一个有序数组（动画按顺序执行）
						{scale: this.state.modalSize},  // 将`bounceValue`赋值给 `scale`
					]
					}}
				>
					<TouchableWithoutFeedback onPress={() => this._renderModal()}>
						<Image 
							source={{uri: 'http://wx3.sinaimg.cn/mw600/006GlaT2ly1fcgte21y1zj30m90xcn4a.jpg'}}
							style={{width:300,height: 300}}
						/>
					</TouchableWithoutFeedback>
					
				</Animated.View>
				<Text>123</Text>
				
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
	listItem: {
		backgroundColor: 'white',
		width: deviceWidth,
		padding: 10,
	},
	itemTitle: {
		flex: 1,
		lineHeight: 20,
		marginRight: 5
	},
	itemImage: {
		width: 60,
		height: 60
	},
	slideContainer: {
		height: 200,
		flex: 0
	},
	slide: {
		height: 200,
		backgroundColor: 'transparent',
	},
	slideTitle: {
		color: '#fff',
		fontSize: 18,
		position: 'absolute',
		bottom: 30,
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center'
	},backgroundVideo: {
	height: 0
  },
})
{/*<LoadingSpinner animating={true} />*/}
{/*<ScrollView>
					<AutoPlaySwipeableViews
						ref='swiper'
						style={styles.slideContainer}
						autoplay={true}
						resistance={true}
						springConfig={{tension: 100, friction: 30}}
						interval={4500}
						children={this.state.topStories.length == 0 ? <View></View> : this.state.topStories}
					/>
						
					<ListView
						dataSource={this.state.stories}
						renderRow={(rowData, sectionID, rowID) => <ListItem data={rowData} key={rowID} />}
						renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
							return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>
						}}
					/>
				</ScrollView>*/}