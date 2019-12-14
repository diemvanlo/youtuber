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
        if (!paginate) {
            this.updateState({fetchFinished: false});
            this.props.onFetchVideos();
            this.updateState({fetchFinished: true});
            // console.log('paginate');
        }
    }

    render() {
        // console.log(this.props.videos);
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <FlatGrid
                    keyExtractor={(item, index) => item.id}
                    items={this.props.videos}
                    extraData={this.state}
                    itemDimension={130}
                    spacing={15}
                    renderItem={({item, index}) => (this.displayItem(item, item, true))}
                    onEndReachedThreshhold={0.5}
                    onReReached={(d) => {
                        if (this.props.videos.length > 0) {
                            this.loadLists(false);
                        }
                        return true;
                    }}
                    fixed={false}
                    ListFooteComponent={
                        <View style={{paddingVertical: 20, backgroundColor: '#fff'}}>
                            {this.state.fetchFinished ? (<Text/>) : (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        width: '100%',
                                        alignItems: 'center',
                                    }}>
                                    <ActivityIndicator size='large' style={{alignSelf: 'center'}}/>
                                </View>
                            )}
                        </View>
                    }
                    ListEmptyComponent={!this.state.fetchFinished ? (<Text/>) : (
                        <EmptyComponent text='No video found'/>)}
                />
            </View>
        );
    }

    displayItem(item, index) {
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
        onFetchVideos: () => {
            dispatch(fetchVideosAction());
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
            console.log(deleteVideoID);
            dispatch(deleteItemAction(deleteVideoID));
        },
    };
};

const VideoItemContainer = connect(mapStateToProps, mapDispatchToProps)(videoItem);
export default VideoItemContainer;

