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

class VideoPlayer extends BaseScreen {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.video.title}`,
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},

    });

    constructor(props) {
        super(props);
        this.activeMenu = 'Library';
        this.video = this.props.navigation.getParam('video');
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
                                 source={{uri: 'https://r6---sn-a5mlrn7z.googlevideo.com/videoplayback?expire=1576652263&ei=h3n5XeuwCsOOV_7Gk8AF&ip=185.27.134.50&id=o-AG_1P37j7Tu_sHplsp6fybPXoPJDWdlJ24GiU-GKxSPe&itag=22&source=youtube&requiressl=yes&mime=video%2Fmp4&ratebypass=yes&dur=774.640&lmt=1576594075324779&fvip=5&fexp=23842630&c=WEB&txp=5432432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIgExYdBY76mn6uMg310VLhtXVryV5x-tU7L6gi6CaHNngCIQC4zUIuxrgvVwPl5wnAnV-navJIWY7nGmi5YOEzq3E-uA%3D%3D&redirect_counter=1&cm2rm=sn-aigesz76&req_id=8325dac96d55a3ee&cms_redirect=yes&mip=116.110.54.205&mm=34&mn=sn-a5mlrn7z&ms=ltu&mt=1576630058&mv=u&mvi=5&pl=12&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRAIgEoqdbvbSwbGsB9VWoAVq8le7Ll-UffRp_MWcbyUFdUQCIB_iWLeKxZbN3CEwNKTCm1I35Jw7pLPFAaCc2QoiOJIj'}}
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
