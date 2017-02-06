import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	Image,
	StatusBar,
	CameraRoll
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import ViewPager from 'react-native-viewpager'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-root-toast'

let deviceWidth = Dimensions.get('window').width

var IMGS = [
	"http://wx3.sinaimg.cn/mw600/661eb95cgy1fcejzv2cz2j20hs0qo76c.jpg",
	'http://wx2.sinaimg.cn/mw600/661eb95cgy1fcejzunglfj20dw0ku40v.jpg',
	'http://wx3.sinaimg.cn/mw600/661eb95cgy1fcejzvj3ksj20kg0kgabs.jpg',
	'http://wx1.sinaimg.cn/mw600/006GlaT2ly1fcfwdsp7b4j30rw0hp14h.jpg',
	'http://wx2.sinaimg.cn/mw600/005vbOHfgy1fcfc9qwvd6j30ia0rfabs.jpg'
]

export default class Viewpager extends Component {

	constructor() {
		super()
		const ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
		this.state = {
			dataSource: ds,
			statusBarHide: true,
			statusBarStyle: 'light-content',
			backButtonHide: 0,
			images: []
		}
  	}
	
	componentWillMount() {
		let arr = this.props.images
		this.setState({
			dataSource: this.state.dataSource.cloneWithPages(arr),
			images: arr
		})
	}

	_renderPage(data, pageID) {
		console.log(pageID)
		return (
			<View style={{flex: 1}}>
				<TouchableWithoutFeedback onPress={() => this.setState({statusBarHide: !this.state.statusBarHide})}>
					<Image
					source={{uri: data}}
					style={{flex: 1}}
					resizeMode='contain'
					/>

				</TouchableWithoutFeedback>
			</View>
			
		)
	}

	render() {
		console.log(this.props)
		return (
            <View style={styles.container}>
				<StatusBar
					backgroundColor="black"
					hidden={this.state.statusBarHide}
					barStyle={this.state.statusBarStyle}
				/>
				<TouchableOpacity 
					style={{position: 'absolute', zIndex: 2,padding: 10,backgroundColor:'transparent',top:20,left: 10,height:this.state.statusBarHide ? 0 : null}}
					onPress={() => {
						Actions.pop()
						this.setState({statusBarStyle: 'dark-content'})
					}}
				>
					<Icon name='arrow-left' size={25} color='#FFDB42' />
				</TouchableOpacity>
                <ViewPager
					ref='viewpager'
					dataSource={this.state.dataSource}
					renderPage={this._renderPage.bind(this)}
					initialPage={this.props.initialImage}
					isLoop={false}
					autoPlay={false}
					renderPageIndicator={() => <View></View>}
				/>
				<TouchableOpacity 
					style={{position: 'absolute', backgroundColor:'rgba(0,0,0,.5)',padding: 10,borderRadius:20,bottom:40,right: 30}}
					onPress={() => {
						let a = CameraRoll.saveToCameraRoll('http://wx3.sinaimg.cn/mw600/661eb95cgy1fcejzv2cz2j20hs0qo76c.jpg','photo')
							a.then((e) => Toast.show('保存成功',{
								position: Toast.positions.CENTER,
								})
							)
							a.catch((e) => Toast.show(e.message,{
								position: Toast.positions.CENTER,
								})
							)
					}}
				>
					<Icon name='download' size={20} color='#FFDB42' />
				</TouchableOpacity>
				
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
})