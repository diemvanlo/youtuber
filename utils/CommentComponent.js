import {connect, Provider} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../containers/BaseContainer';
import React, {Component} from 'react';
import BaseScreen from './BaseScreen';
import {Container, Icon, Item, Input, Button, Text} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {View, TouchableOpacity, FlatList, ActivityIndicator, BackHandler, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';

class CommentComponent extends BaseScreen {

    constructor(props) {
        super(props);
        this.type = this.props.type;
        this.item = this.props.track;
        this.state = {
            ...this.state,
            loading: true,
            commentText: '',
            comments: [],
        };
        this.component = this.props.component;

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.component.updateState({commentModalVisible: false});
        return true;
    };

    render() {
        return this.showContent(
            <Container style={{backgroundColor: '#141821'}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#141821',
                        padding: 10,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.component.updateState({commentModalVisible: false});
                        }}>
                            <Icon name='close' style={{color: '#fff', fontSize: 30}}/>
                        </TouchableOpacity>
                        <Text style={{
                            color: '#fff',
                            fontSize: 20,
                            marginLeft: 10,
                        }}>Comments</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                            style={{flex: 1}}
                            onEndReachedThreshold={0.5}
                            onEndReached={(d) => {
                                console.log('end of line');
                                this.loadComments();
                            }}
                            data={this.state.comments}
                            extraData={this.state}
                            keyExtractor={(item, index) => item.id}
                            refreshing={this.state.loading}
                            onRefresh={() => {
                                this.handleCommentsRefresh();

                            }}
                            ListFooterComponent={
                                <View style={{paddingVertical: 20}}>{
                                    (!this.state.fetchFinished) ? (
                                        <ActivityIndicator size='large'/>
                                    ) : null
                                }</View>
                            }
                            renderItem={({item, index}) => {
                                this.displayComment(item, index, false);
                            }}
                        />
                    </View>
                    <View style={{
                        height: 60,
                        borderTopColor: '#141821',
                        borderWidth: 1,
                        padding: 10,
                        flexDirection: 'row',
                    }}>
                        {this.isLoggedIn() ? (
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <FastImage source={{uri: this.item.avatar}}
                                           style={{width: 40, height: 40, borderRadius: 100}}/>
                                <Item rounded style={{flex: 1, marginLeft: 5}}>
                                    <Input
                                        style={{color: '#fff'}}
                                        value={this.state.commentText}
                                        placeholder='Enter a comment'
                                        onChangeText={(t) => this.updateState({commentText: t})}/>
                                </Item>
                                <Button rounded success style={{backgroundColor: '#FA0052', marginLeft: 5}}>
                                    <Icon name='paper-plane' style={{fontSize: 18}} type="SimpleLineIcons"/>
                                </Button>
                            </View>
                        ) : (<View/>)}
                    </View>
                </View>
            </Container>,
        );
    }

    loadComments() {
        this.props.onFetchComments(this.item.id);
        this.updateState({loading: false, comments: this.props.comments});
        // console.log("this.props.comments");
        console.log(this.props.comments);
    }

    handleCommentsRefresh() {
        this.loadComments();
    }

    displayComment(item, index, reply) {
        console.log(item);
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <FastImage/>
            </View>
        );
    }
}

const CommentComponentContainer = connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
export default CommentComponentContainer;
