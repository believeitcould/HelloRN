import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
	Dimensions,
  	Text,
	Image,
  	View,
	WebView,
	Slider,
	TouchableOpacity,
	ListView,
	TouchableWithoutFeedback
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video'
import Modal from 'react-native-modalbox'
import LoadingSpinner from '../components/loadingSpinner'

let deviceWidth = Dimensions.get('window').width

const SongItem = ({ data, rowID }) => {
	let _this = this
	return (
		<TouchableOpacity onPress={() => console.log(rowID)}>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				backgroundColor: '#fff',
				alignItems: 'center'
				}}
			>
				<View style={{flexDirection: 'row', alignItems: 'flex-end',marginLeft: 10}}>
				<Text>{data.name}</Text>
				<Text style={{fontSize: 11, color: '#AAA'}}> - {data.artists[0].name}</Text>
				</View>
							
				<TouchableWithoutFeedback
					onPress={() => {
						{/*console.log(_this.state)*/}
					}
				}>
					<Icon
						name='times'
						size={20} color='#CCC'
						style={{padding: 10}}
					/>
				</TouchableWithoutFeedback>
			</View>
		</TouchableOpacity>
	)
}

export default class Music extends Component {

	constructor() {
		super()
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			songs: ds,
			currentSong: {},
			sliderValue: 0,
			videoUri: '',
			videoPause: true,
			playButton: 'play-circle',
			current: '00:00',
			duration: this._formatTime(Math.floor(213263 / 1000))
		}
  	}

	componentDidMount() {
		this.setState({
			videoUri: 'http://m2.music.126.net/NnHwR2HV-1OoKZ6R5LVy4Q==/18502581673300023.mp3'
		})

		// 网易云音乐 云音乐热歌榜 api
		let url = 'http://music.163.com/api/playlist/detail?id=3778678&updateTime=-1'
		fetch(url)
			.then((data) => {
				return data.json()
			})
			.then((res) => {
				let songs = res.result.tracks
				// 取前20首
				songs.length = 20
				this.setState({
					songs: this.state.songs.cloneWithRows(songs),
					currentSong: songs[0]
				},console.log(songs[0]))
			})
	}

	_playButton() {
		console.log(123)
		this.setState({
			playButton: this.state.videoPause ? 'pause-circle' : 'play-circle',
			videoPause: !this.state.videoPause
		})
	}

	_onProgress(data) {
		// currentTime 23.313s
		let val = parseInt(data.currentTime * 1000)
		this.setState({
			sliderValue: val,
			current: this._formatTime(Math.floor(data.currentTime))
		})
		console.log(this._formatTime(Math.floor(data.currentTime)))
	}

	_formatTime(time) {
		// 71s -> 01:11
		let min = Math.floor(time / 60)
		let second = time - min * 60
		min = min >= 10 ? min : '0' + min
		second = second >= 10 ? second : '0' + second
		return min + ':' + second
	}

	render() {
		if (!this.state.currentSong.name) return <LoadingSpinner animating={true} /> 
		return (
			<View style={styles.container}>
				{ this.state.videoUri ?
					<Video 
						source={{uri: this.state.currentSong.mp3Url}}   // Can be a URL or a local file.
						ref='video'                           // Store reference
						rate={1.0}                     // 0 is paused, 1 is normal.
						volume={1.0}                   // 0 is muted, 1 is normal.
						muted={false}                  // Mutes the audio entirely.
						paused={this.state.videoPause}                 // Pauses playback entirely.
						repeat={true}                  // Repeat forever.
						playInBackground={false}       // Audio continues to play when app entering background.
						playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
						progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
						onProgress={this._onProgress.bind(this)}
						onError={(e) => console.log(e)}
					/>
					:
					null
				}
				
				<Image
					style={styles.image}
					source={{uri: this.state.currentSong.album.picUrl}}
					resizeMode='cover'
				/>

				<View style={styles.playingInfo}>
					<Text>{this.state.currentSong.name} - {this.state.currentSong.artists[0].name}</Text>
					<Text>{this.state.current} - {this._formatTime(Math.floor(this.state.currentSong.duration / 1000))}</Text>
				</View>
				<View style={styles.playingControl}>
					<TouchableOpacity onPress={this._playButton.bind(this)}>
						<Icon name={this.state.playButton} size={40} color='#FFDB42' />
					</TouchableOpacity>
					<Slider
						ref='slider'
						style={{flex: 1, marginLeft: 10, marginRight: 10}}
						value={this.state.sliderValue}
						onValueChange={(value) => {
							this.setState({
								videoPause: true,
								current: this._formatTime(Math.floor(value / 1000))
								})
							}
						}
						onSlidingComplete={(value) => {
							this.refs.video.seek(value / 1000)
							// 判断是否处于播放状态			
							if (this.state.playButton === 'pause-circle') this.setState({videoPause: false})
							}
						}
						maximumValue={this.state.currentSong.duration}
						step={1}
						minimumTrackTintColor='#FFDB42'
					/>
					<TouchableOpacity onPress={() => this.refs.modal4.open()}>
						<Icon name='list-ul' size={30} color='#FFDB42' />
					</TouchableOpacity>
				</View>
				
				<Modal style={styles.modal} position={"bottom"} ref={"modal4"}>
					<ListView
 						dataSource={this.state.songs}
 						renderRow={(rowData, sectionID, rowID) => <SongItem data={rowData} key={rowID} rowID={rowID} />}
 						renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
							return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>
 						}}
 				/>
				</Modal>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		paddingTop: 60,
		paddingBottom: 50
	},
	image: {
		flex: 1
	},
	playingControl: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20
	},
	playingInfo: {
		flexDirection: 'row',
		alignItems:'stretch',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	text: {
		color: "black",
		fontSize: 22
	},
	modal: {
		height: 300,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		paddingTop: 5,
		paddingBottom: 50
	},
})
// {/**/}