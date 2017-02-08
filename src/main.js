import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
    ToastAndroid,
    Platform
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import SplashScreen from 'react-native-splash-screen'


import Article from './tabs/article/article'
import ArticleContent from './tabs/article/content'
import Image from './tabs/image/image'
import ImageViewpager from './tabs/image/viewpager'
import Music from './tabs/music'
import Map from './tabs/map/map'

console.disableYellowBox = false    //关闭warning

class TabIcon extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={this.props.tabIcon} size={20} color={this.props.selected ? "#FFDB42" : '#BBB'} />
                <Text style={{color: this.props.selected ? '#FFDB42' : '#BBB', marginTop: 5, fontSize:12}}>{this.props.title}</Text>
            </View>
            
        )
    }
}

// const reducerCreate = params => {
//     const defaultReducer = Reducer(params)
//     return (state, action) => {
//         console.log("ACTION:", action)
//         return defaultReducer(state, action)
//     }
// }

export default class Main extends Component {

    componentDidMount() {
        // setTimeout(SplashScreen.hide, 500)
        SplashScreen.hide()
        // this.int = 0
        // this.timer = setInterval(() => {console.log(this.int), this.int ++}, 1000)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    _backAndroidHandler() {
        if (Platform.OS === 'android') {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false
            }
            this.lastBackPressed = Date.now()
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
            return true
        }else {
            return true
        }
    }

	render() {
		return (
            <Router onExitApp={this._backAndroidHandler}>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#BBB'}}>
                        <Scene key="tab1" initial={true} title="知乎" icon={TabIcon} tabIcon="home" navigationBarStyle={{backgroundColor: '#ffdb42'}} >
                            <Scene key='article'  component={Article} title='你知道吗' />
                            <Scene key='articleContent'  component={ArticleContent} title='文章内容' hideTabBar/>
                        </Scene>
                        <Scene key="tab2" title="妹图" icon={TabIcon} tabIcon="circle-o" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key="ooxx" component={Image} title="OOXX" />
                            <Scene key="ooxxViewPager" component={ImageViewpager} hideNavBar hideTabBar type />
                        </Scene>
                        <Scene key="tab3" title="歌单" icon={TabIcon} tabIcon="music" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='music' title='热歌榜' component={Music} />
                        </Scene>                               
                        <Scene key="tab4" title="地图" icon={TabIcon} tabIcon="map-marker" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='map' title='我在哪' component={Map} />
                        </Scene>
                    </Scene>
                </Scene>
                
            </Router>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
})

