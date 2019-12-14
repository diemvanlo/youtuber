import React, {Component} from 'react';
import BaseScreen from './BaseScreen';
import {Content, Container} from 'native-base';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

class VideoPlayer extends BaseScreen {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.video.title}`,
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},

    });

    constructor(props) {
        console.log('video player');
        super(props);
        this.activeMenu = 'Library';
        this.video = this.props.navigation.getParam('video');
        this.state = {
            ...this.state,
            loading: true,
            item: this.video,
            suggestVideos: [],
        };
    }

    render() {
        return this.show(
            <Container style={{backgroundColor: '#141821'}}>
                <Content style={{backgroundColor: '#141821'}}>
                    <View style={{width: '100%', height: 300, backgroundColor: '#000'}}>
                        <WebView onLoadEnd={() => {
                            this.updateState({loading: false});
                        }}
                                 source={{uri: this.video.url}}
                                 style={{width: '100%', height: 300, backgroundColor: '#000'}}
                        />
                        {this.state.loading && (
                            <View style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor: '#000000',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ActivityIndicator/>
                            </View>
                        )}
                    </View>
                </Content>
            </Container>,
        );
    }
}

export default VideoPlayer;
