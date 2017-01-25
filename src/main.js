import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import Tabs from 'react-native-tabs'

import Article from './tabs/article'
import Image from './tabs/image'
import Music from './tabs/music'
import Video from './tabs/video'

export default class Main extends Component {
	render() {
		return (
            <Tabs>
                <Article tabLabel="文章" />
                <Image tabLabel="图片" />
                <Music tabLabel="音乐" />
                <Video tabLabel="视频" />
            </Tabs>
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

// <ScrollableTabView tabBarPosition="bottom">
//                 <Article tabLabel="article" />
//                 <Image tabLabel="image" />
//                 <Music tabLabel="music" />
//                 <Video tabLabel="video" />
//             </ScrollableTabView>