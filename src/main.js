import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
    
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import Tabs from 'react-native-tabs'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import Article from './tabs/article/article'
import ArticleContent from './tabs/article/content'
import Image from './tabs/image/image'
import ImageViewpager from './tabs/image/viewpager'
import Music from './tabs/music'
import Map from './tabs/map/map'

console.disableYellowBox = true    //关闭warning

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

const reducerCreate = params => {
    const defaultReducer = Reducer(params)
    return (state, action) => {
        console.log("ACTION:", action)
        return defaultReducer(state, action)
                                    // <Scene key="articleContent" component={ArticleContent} title='文章内容' hideTabBar={true} backTitle=''/>

    }
}

export default class Main extends Component {
	render() {
		return (
            <Router>
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
// <Scene key="register" component={Register} title="Register"/>
//                         <Scene key="register2" component={Register} title="Register2" duration={1}/>
//                         <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE}/>
//                         <Scene key="launch" component={Launch} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
//                         <Scene key="login" direction="vertical">
//                             <Scene key="loginModal" component={Login} schema="modal" title="Login"/>
//                             <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
//                         </Scene>
// <Tabs>
//                 <Article tabLabel="文章" />
//                 <Image tabLabel="图片" />
//                 <Music tabLabel="音乐" />
//                 <Video tabLabel="视频" />
//             </Tabs>
// <ScrollableTabView tabBarPosition="bottom">
//                 <Article tabLabel="article" />
//                 <Image tabLabel="image" />
//                 <Music tabLabel="music" />
//                 <Video tabLabel="video" />
//             </ScrollableTabView>


// <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
//                 <Scene key="modal" component={Modal} >
//                     <Scene key="root" hideNavBar={true}>
//                         <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor:'#fff',borderTopWidth:.5,borderTopColor:'#ccc'}}>
//                             <Scene key="tab1" initial={true} title="知乎" icon={TabIcon} tabIcon="home" component={Article} navigationBarStyle={{backgroundColor: '#ffdb42'}} titleStyle={{color:'black'}} />
//                             <Scene key="tab2" title="妹图" icon={TabIcon} tabIcon="circle-o">
//                                 <Scene key="tab2_1" component={Image} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
//                                 <Scene key="tab2_2" component={Image} title="Tab #2_2" />
//                             </Scene>
//                             <Scene key="tab4" title="歌单" hideNavBar={true} icon={TabIcon} tabIcon="music">
//                                 <Scene key="dddd" component={Music} />
//                                 <Scene key="articleContent" component={ArticleContent} />
//                             </Scene>
//                             <Scene key="tab5" component={Video} title="视频" icon={TabIcon} tabIcon="tv" />
//                         </Scene>
                        
//                     </Scene>
//                     <Scene key="error" component={Error} />
//                 </Scene>
//             </Router>