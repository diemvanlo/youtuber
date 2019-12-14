import React, {Component} from 'react';
import {Button, Container, Content, Icon, StyleProvider, Footer, FooterTab, Text} from 'native-base';
import {View} from 'react-native';

class BaseScreen extends React.Component {
    activeMenu = 'Home';

    constructor(props) {
        super(props);
    }

    updateState(val) {
        this.setState(val);
    }

    openVideo(video) {
        this.props.navigation.navigate('VideoPlayer', {video: video, component: this});
    }

    show(jsx) {
        return (
            <Container>
                <View style={{flex: 1}}>
                    {jsx}
                </View>
                <Footer>
                    <FooterTab>
                        <Button style={{borderRadius: 0}} transparent vertical onPress={() => {
                            this.props.navigation.navigate('Home');
                        }}>
                            <Icon type="SimpleLineIcons" name='home'
                                  style={{color: (this.activeMenu === 'Home' ? '#fff' : '#FA0052')}}></Icon>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: 'bold',
                                color: (this.activeMenu === 'Home' ? '#fff' : '#FA0052'),
                            }}>Home</Text>
                        </Button>
                        <Button style={{borderRadius: 0}} transparent vertical onPress={() => {
                            this.props.navigation.navigate('Trend');
                        }}>
                            <Icon type="SimpleLineIcons" name='flag'
                                  style={{color: (this.activeMenu === 'Trend' ? '#fff' : '#FA0052')}}></Icon>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: 'bold',
                                color: (this.activeMenu === 'Trend' ? '#fff' : '#FA0052'),
                            }}>Trend</Text>
                        </Button>
                        <Button style={{borderRadius: 0}} transparent vertical onPress={() => {
                            this.props.navigation.navigate('Library');
                        }}>
                            <Icon type="SimpleLineIcons" name='folder'
                                  style={{color: (this.activeMenu === 'Library' ? '#fff' : '#FA0052')}}></Icon>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: 'bold',
                                color: (this.activeMenu === 'Library' ? '#fff' : '#FA0052'),
                            }}>Library</Text>
                        </Button>
                        <Button style={{borderRadius: 0, padding: 0}} transparent vertical onPress={() => {
                            this.props.navigation.navigate('Notification');
                        }}>
                            <Icon name='notifications'
                                  style={{color: (this.activeMenu === 'Notification' ? '#fff' : '#FA0052')}}></Icon>
                            <Text style={{
                                paddingLeft: 0,
                                paddingRight: 0,
                                fontSize: 10,
                                fontWeight: 'bold',
                                color: (this.activeMenu === 'Notification' ? '#fff' : '#FA0052'),
                            }}>Notification</Text>
                        </Button>
                        <Button style={{borderRadius: 0}} transparent vertical onPress={() => {
                            this.props.navigation.navigate('Exit');
                        }}>
                            <Icon name='exit' style={{color: '#FA0052'}}></Icon>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: 'bold',
                                color: (this.activeMenu === 'Exit' ? '#fff' : '#FA0052'),
                            }}>Exit</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default BaseScreen;
