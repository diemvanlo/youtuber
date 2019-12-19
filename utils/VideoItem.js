import {Platform, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import {Icon, Button, Card, CardItem, Text, Body, Left, Right} from 'native-base';
import FlatGrid from 'react-native-super-grid';
import GridView from 'react-native-super-grid';
import EmptyComponent from './EmptyComponent';
import {connect, Provider} from 'react-redux';
import {
    addVideosAction,
    fetchVideosAction,
    fetchSucceededAction,
    fetchFailedAction,
    updateItemAction,
    updateItemSuccessAction,
    deleteItemAction,
} from '../actions';
import React, {Component} from 'react';
import BaseScreen from './BaseScreen';
import videoComponent from '../components/VideoComponent';
import FastImage from 'react-native-fast-image';

class videoItem extends BaseScreen {

    limit = 10;
    type = '';
    typeId = '';
    page = 1;
    fetchFinished: true;
    itemListNotEnd: true;

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            type: this.props.type,
            typeId: this.props.typeId,
        };
        this.limit = 10;
        this.component = this.props.component;
        this.loadLists(false);
    }

    loadLists(paginate) {
        if (this.state.fetchFinished === true) {
            if (paginate) {
                this.page++;
            }
        }
        this.props.onFetchVideos(this.page, this.limit, this.props.typeId);
        this.itemListNotEnd = (this.props.videos.length < 1);
        this.updateState({fetchFinished: true, videos: this.props.videos});
    }

    render() {
        // console.log(this.props.videos.length);
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <GridView
                    keyExtractor={(item, index) => item.id}
                    items={this.props.videos}
                    extraData={this.state}
                    itemDimension={130}
                    spacing={15}
                    style={{backgroundColor: '#fff'}}
                    onEndReachedThreshold={1.5}
                    onEndReached={(d) => {
                        console.log(this.props.typeId);
                        if (!this.props.typeId) {
                            this.loadLists(true);
                        }
                        return true;
                    }}
                    fixed={false}
                    ListFooterComponent={
                        <View style={{paddingVertical: 20}}>
                            {this.state.fetchFinished || this.props.typeId ? (<Text/>) : (
                                <View style={{
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    width: '100%',
                                    alignItems: 'center',
                                }}>
                                    <ActivityIndicator style={{alignSelf: 'center'}} size='large'/>
                                </View>
                            )}
                        </View>
                    }
                    ListEmptyComponent={!this.state.fetchFinished ? (
                        <Text/>
                    ) : (
                        <EmptyComponent text='no_videos_found'/>
                    )}
                    renderItem={(item, index) => this.displayItem(item.item, index, true)}
                />
            </View>
        );
    }

    displayItem(item, index) {
        // console.log(item);
        if (item === false) {
            return null;
        }
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <TouchableOpacity onPress={() => {
                    this.component.openVideo(item);
                }}>
                    <FastImage style={{
                        width: '100%', height: 150, marginBottom: 10, borderColor: '#D1D1D1', borderWidth: 1,
                    }}
                               source={{uri: item.thumb}}
                               resizeMode={FastImage.resizeMode.cover}
                    >
                        <View style={{
                            width: 70,
                            height: 70,
                            borderColor: '#fff',
                            borderWidth: 1,
                            padding: 16,
                            borderRadius: 100,
                            alignSelf: 'center',
                            marginTop: 50,
                        }}>
                            <Icon name='play' style={{color: '#fff', fontSize: 30, marginLeft: 10}} type='FontAwesome'/>
                        </View>
                    </FastImage>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text numberOfLines={1} style={{
                        fontSize: 15,
                        color: '#141821',
                        fontWeight: '500',
                    }}>{item.title}</Text>
                </TouchableOpacity>
                {(item.name !== undefined) ? (
                    <Text numberOfLin es={1} note style={{
                        marginTop: 5,
                        fontSize: 15,
                        fontWeight: '400',
                    }}>
                        {item.name}
                    </Text>
                ) : null}
            </View>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.videoReducers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchVideos: (page, limit, searchString) => {
            dispatch(fetchVideosAction(page, limit, searchString));
        },
        onAddVideo: (newVideo) => {
            dispatch(addVideosAction(newVideo));
        },
        onUpdateItemAction: (updatedVideo) => {
            dispatch(updateItemAction(updatedVideo));
        },
        onUpdateItemSuccessAction: (updatedVideo) => {
            dispatch(updateItemSuccessAction(updatedVideo));
        },
        onUpDeleteItemAction: (deleteVideoID) => {
            dispatch(deleteItemAction(deleteVideoID));
        },
    };
};

const VideoItemContainer = connect(mapStateToProps, mapDispatchToProps)(videoItem);
export default VideoItemContainer;
