import React, {Component} from 'react';
import BaseScreen from './BaseScreen';
import {
    Content, Container, Text, Icon, Toast,
    Root,
} from 'native-base';
import {View, StyleSheet, ActivityIndicator, TouchableOpacity, Platform, Share} from 'react-native';
import {WebView} from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import {connect, Provider} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../containers/BaseContainer';
import Modal from 'react-native-modal';
import CommentComponent from './CommentComponent';
import {
    addVideosAction,
    deleteItemAction,
    fetchVideosAction,
    updateItemAction,
    updateItemSuccessAction,
} from '../actions';

class VideoPlayer extends BaseScreen {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.video.title}`,
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},

    });

    constructor(props) {
        super(props);
        this.activeMenu = 'Library';
        this.video = this.props.navigation.getParam('video');
        this.props.onFetchVideos(1, 10);
        this.state = {
            ...this.state,
            loading: true,
            item: this.video,
            suggestVideos: this.props.videos,
            commentModalVisible: false,
        };
    }

    like() {
        let item = this.state.item;
        item.hasLiked = (item.hasLiked === 1) ? 0 : 1;
        this.item = item;
        if (item.hasLiked === 1) {
            Toast.show({
                text: 'You love it',
                buttonText: 'Okay!',
                type: 'success',
            });
        }
        this.updateState({item: item});
    }

    render() {
        return this.show(
            <Container style={{backgroundColor: '#141821'}}>
                <Modal isVisible={this.state.commentModalVisible}
                       onSwipeComplete={() => {
                           this.updateState({commentModalVisible: false});
                       }}
                       style={{margin: 0}}
                >
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <CommentComponent navigation={this.props.navigation} type='video' component={this}
                                          track={this.video}/>
                    </View>
                </Modal>
                <Content style={{backgroundColor: '#141821'}}>
                    <View style={{width: '100%', height: 300, backgroundColor: '#000'}}>
                        <WebView onLoadEnd={() => {
                            this.updateState({loading: false});
                        }}
                                 source={{uri: this.state.item.url}}
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
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.like();
                                }}
                                style={{padding: 5, marginLeft: 15}}>
                                <Icon name='heart' type='SimpleLineIcons' style={{
                                    fontSize: 17,
                                    color: this.state.item.hasLiked === 1 ? '#FA0052' : '#fff',
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding: 5, marginLeft: 15}} onPress={() => {
                                this.updateState({commentModalVisible: true});
                            }}>
                                <Icon name='bubble' type='SimpleLineIcons' style={{fontSize: 20, color: '#fff'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding: 5, marginLeft: 15}} onPress={() => {
                                let message = 'Share this video';
                                if (Platform.OS !== 'ios') {
                                    message += ' ' + this.state.item.url;
                                }
                                Share.share({
                                        message: message,
                                        url: this.state.item.url,
                                        title: 'Share this video',
                                    }, {
                                        dialogTitle: 'Share this video',
                                    },
                                );
                            }}>
                                <Icon name="share" type="SimpleLineIcons" style={{fontSize: 20, color: '#fff'}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Icon name='heart' type='SimpleLineIcons' style={{fontSize: 17, color: '#fff'}}/>
                            <Text style={{marginLeft: 5, color: '#fff'}}>{this.state.item.likeCount}</Text>
                            <Icon name='eye' type='SimpleLineIcons'
                                  style={{fontSize: 17, marginLeft: 7, color: '#fff'}}/>
                            <Text style={{marginLeft: 5, marginRight: 7, color: '#fff'}}>{this.state.item.views}</Text>
                            <Icon name='control-play' type='SimpleLineIcons'
                                  style={{fontSize: 17, color: '#fff', marginLeft: 7}}/>
                            <Text style={{marginLeft: 5, marginRight: 7, color: '#fff'}}>
                                {this.state.item.plays}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderTopWidth: 0.5,
                        marginTop: 15,
                        padding: 10,
                        backgroundColor: '#212835',
                    }}>
                        <TouchableOpacity>
                            <FastImage style={{width: 40, height: 40, borderColor: '#D1D1D1', borderWidth: 1}}
                                       source={{uri: this.state.item.avatar}}>
                            </FastImage>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                marginLeft: 10,
                                marginTop: 10,
                                fontSize: 15,
                                color: '#fff',
                            }}>{this.state.item.name}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.suggestVideos.length > 0 ?
                        (<View style={{marginTop: 10, padding: 10}}>
                            <Text style={{
                                fontSize: 15,
                                color: '#fff',
                                marginBottom: 10,
                            }}>
                                Suggested videos
                            </Text>
                            {this.displayVideos()}
                        </View>)
                        : null}
                </Content>
            </Container>,
        );
    }

    displayVideos() {
        let views = [];
        for (let i = 0; i < this.state.suggestVideos.length; i++) {
            let video = this.state.suggestVideos[i];
            views.push(
                <TouchableOpacity onPress={() => {
                    this.props.navigation.push('VideoPlayer', {
                        video: video,
                        component: this,
                    });
                }}>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <FastImage style={{width: 40, height: 40, borderColor: '#D1D1D1', borderWidth: 1}}
                                   source={{uri: video.thumb}} resizeMode={FastImage.resizeMode.cover}/>
                        <View style={{flex: 1}}>
                            <Text numOfLines={1} style={{
                                marginLeft: 10,
                                marginTop: 10,
                                fontSize: 15,
                                color: '#fff',
                            }}>{video.title}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 7}}>
                            <Icon name='heart' type='SimpleLineIcons' style={{fontSize: 14, color: '#fff'}}/>
                            <Text style={{marginLeft: 5, color: '#fff'}}>{video.likeCount}</Text>
                            <Icon name='control-play' type='SimpleLineIcons'
                                  style={{fontSize: 14, color: '#fff', marginLeft: 7}}/>
                            <Text style={{marginLeft: 5, marginRight: 7, color: '#fff'}}>{video.plays}</Text>
                        </View>
                    </View>
                </TouchableOpacity>,
            );
        }
        return (<View>{views}</View>);
    }
}

const VideoPlayerContainer = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
export default VideoPlayerContainer;
