import {Container, Text, Content, Icon, Header, Item, Input, Tab, Tabs} from 'native-base';
import React, {Component} from 'react';
import {BackHandler, Alert} from 'react-native';
import BaseScreen from '../utils/BaseScreen';
import VideoItemContainer from '../utils/VideoItem';

export default class Library extends BaseScreen {
    static navigationOptions = {
        title: 'Library',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='folder' style={{color: tintColor}}></Icon>;
        },
    };

    constructor(props) {
        super(props);
        this.activeMenu = 'Library';
        this.state = {
            ...this.state,
            term: '',
        };
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler() {
        this.forceUpdate();
    };

    render() {
        return this.show(
            <Container style={{flex: 1, backgroundColor: '#141821'}}>
                {/*<Header searchBar rounded hasTabs*/}
                {/*        style={{paddingBottom: 0, backgroundColor: '#141821', height: 65}}>*/}
                {/*    <Item>*/}
                {/*        <Icon style={{color: '#E3E3E3'}} name='ios-search'/>*/}
                {/*        <Input style={{color: '#000'}} value={this.state.term} placeholder={'Search...'}*/}
                {/*               onChangeText={(t) => {*/}
                {/*                   // console.log(t);*/}
                {/*                   this.updateState({term: t});*/}
                {/*                   this.forceUpdateHandler();*/}
                {/*               }}/>*/}
                {/*        <Icon name='music-tone' type="SimpleLineIcons" style={{color: '#303A4F'}}/>*/}
                {/*    </Item>*/}
                {/*</Header>*/}
                {this.state.term === '' ? (
                        <Tabs style={{
                            paddingTop: 0,
                            backgroundColor: '#E3E3E3',
                            elevation: 0, shadowOffset: {height: 0, width: 0},
                            shadowOpacity: 0, flex: 1, borderWidth: 0,
                        }} tabBarUnderlineStyle={{height: 3, bottom: 0}}>
                            <Tab heading='BROWSER'>
                                <VideoItemContainer component={this} naviagtion={this.props.navigation}
                                                    type={this.state.term ? 'search' : 'latest'}/>
                            </Tab>
                            <Tab heading='TOP VIDEO'>
                                <VideoItemContainer component={this} naviagtion={this.props.navigation}
                                                    type={this.state.term ? 'search' : 'latest'}/>
                            </Tab>
                        </Tabs>
                    ) :
                    (
                        <Tabs style={{
                            paddingTop: 0,
                            backgroundColor: '#E3E3E3',
                            elevation: 0, shadowOffset: {height: 0, width: 0},
                            shadowOpacity: 0, flex: 1, borderWidth: 0,
                        }} tabBarUnderlineStyle={{height: 3, bottom: 0}}>
                            <Tab heading={'Key word "' + this.state.term + '"'}>
                                <VideoItemContainer key={this.state.term} component={this}
                                                    naviagtion={this.props.navigation}
                                                    type={this.state.term ? 'search' : 'latest'}
                                                    typeId={this.state.term}/>
                            </Tab>
                        </Tabs>
                    )}
            </Container>,
        );
    }
}

