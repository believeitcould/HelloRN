import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import Tabs from 'react-native-tabs'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'

import Article from './tabs/article'
import Image from './tabs/image'
import Music from './tabs/music'
import Video from './tabs/video'

class TabIcon extends React.Component {
    render() {
        console.log(this.props)
        return (
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <Icon name={this.props.tabIcon} size={20} color={this.props.selected ? "#ffdb42" : '#bbb'} />
                <Text style={{color: this.props.selected ? '#ffdb42' :'#bbb',marginTop:5,fontSize:12}}>{this.props.title}</Text>
            </View>
            
        )
    }
}

const reducerCreate = params => {
    const defaultReducer = Reducer(params)
    return (state, action) => {
        console.log("ACTION:", action)
        return defaultReducer(state, action)
    }
}

export default class Main extends Component {
	render() {
		return (
            <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
                <Scene key="modal" component={Modal} >
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor:'#fff',borderTopWidth:.5,borderTopColor:'#ccc'}}>
                            <Scene key="tab1"  initial={true} title="文章" icon={TabIcon} tabIcon="home" component={Article} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'white'}} />
                            <Scene key="tab2" title="妹图" icon={TabIcon} tabIcon="circle-o">
                                <Scene key="tab2_1" component={Music} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
                                <Scene key="tab2_2" component={Music} title="Tab #2_2"/>
                            </Scene>
                            <Scene key="tab4" component={Video} title="歌单" hideNavBar={true} icon={TabIcon} tabIcon="music" />
                            <Scene key="tab5" component={Video} title="视频" icon={TabIcon} tabIcon="tv" />
                        </Scene>
                    </Scene>
                    <Scene key="error" component={Error}/>
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
		backgroundColor: '#F5FCFF',
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