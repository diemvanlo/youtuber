import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Alert,
} from 'react-native';
import {Container, Icon, Text, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button} from 'native-base';
import {WebView} from 'react-native-webview';
import {BackHandler} from 'react-native';
const {width, height} = Dimensions.get('screen');
import BaseScreen from '../utils/BaseScreen';
const styles = StyleSheet.create({
    flatList_items:
        {
            fontSize: 20,
            color: '#000',
            padding: 10,
        },
    MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            margin: 5,
            paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        },
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    header: {
        backgroundColor: 'transparent',
        paddingTop: 36,
        paddingHorizontal: 36,
        paddingBottom: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    articles: {
        overflow: 'visible',
    },
    destination: {
        width: width - (36 * 2),
        height: width,
        borderRadius: 12,
        paddingHorizontal: 36,
        marginHorizontal: 36,
        paddingVertical: 24,
        overflow: 'visible',
    },
    destinations: {
        flex: 2,
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    destinationInfo: {
        // position: 'absolute',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 36,
        // bottom: 30,
        // top: 160,
        right: 36,
        left: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        overflow: 'visible',
    },
    recommemdedInfo: {
        // position: 'absolute',
        borderRadius: 12,
        paddingHorizontal: 6,
        // bottom: 30,
        // top: 160,
        right: 36,
        left: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        overflow: 'visible',
    },

    recommemdations: {
        flex: 2,
        justifyContent: 'space-between',
    },
    recommemded: {
        padding: 36,
    },
    avatar:
        {
            width: 36, height: 36, borderRadius: 18,
        },
    rating: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // its for android
        elevation: 10,
    },
    dots: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: '#DCE0E9',
        borderWidth: 2.5,
        marginHorizontal: 7,
        borderColor: 'transparent',
    },
    activeDot: {
        borderColor: '#007BFA',
        borderWidth: 2,
    },
    recommendation: {
        width: (width - (36 * 2)),
        height: 500,
        borderRadius: 12,
        overflow: 'visible',
        // paddingHorizontal: 36,
        // paddingVertical: 24,
    },

});

class VideoComponent extends BaseScreen {
    constructor(props) {
        super(props);
        this.activeMenu = 'Home';
        this.props.onFetchVideos();
        // console.log(this.props.videos);
        const pageVideo = this.props.videos.slice(1, 10);
        this.state = {
            isLoading: true,
            videos: this.props.videos.reverse(),
            pageVideo: pageVideo,
            page_size: 3,
            page_number: 1,
            listVideo: [],
        };
        // console.log(this.state.videos);
    }

    static navigationOptions = {
        header: (
            <View style={[styles.row, styles.header]}>
                <View>
                    <Text>
                        Search for something
                    </Text>
                    <Text style={{fontSize: 24}}>
                        Feeds
                    </Text>
                </View>
                <View>
                    <Image style={styles.avatar}
                           source={{uri: 'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg'}}
                    />
                </View>
            </View>
        ),
        headerTitle: 'gggbbcc',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='home' style={{color: tintColor}}></Icon>;
        },
    };

    emptyList = () => {

    };
    headerList = () => {

    };
    footerList = () => {
        return (
            <View>
            </View>
        );
    };
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#607D8B',
                }}
            />
        );
    };

    paginate = (array, page_size, page_number) => {
        --page_number; // because pages logically start with 1, but technically with 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    };

    handleLoadMore = () => {
        console.log('handle load more: ' + this.state.page_number);
        this.setState({
            isLoading: false,
            listVideo: [...this.state.listVideo, ...this.paginate(this.state.videos, this.state.page_size, this.state.page_number)],
            page_number: this.state.page_number + 1,
        });
        // console.log(this.state.listVideo);
    };

    componentDidMount() {
        // console.log('componentDidMount: ' + this.state.page_number);
        this.setState({
            isLoading: false,
            listVideo: [...this.state.listVideo, ...this.paginate(this.state.videos, this.state.page_size, this.state.page_number)],
            page_number: this.state.page_number + 1,
        });
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid,
        );
        // console.log(this.state.listVideo);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid,
        );
    }

    handleBackButtonPressAndroid = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                {text: 'No', onPress: () => this.props.navigation.navigate('Home')},
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false});
        return true;
    };

    render() {
        // console.log(this.state.videos);
        return this.show(
            <View style={{flex: 1}}>
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    style={{backgroundColor: 'grey', width: '100%'}}
                    source={{uri: 'https://www.youtube.com/embed/OCMs-YhSp2o?autoplay=1'}}
                />
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
                                    <Body>
                                        <Text>Điểm Văn Lô</Text>
                                        <Text note>26 February 2000</Text>
                                    </Body>
                                </Left>
                                <Right>

                                    <Button transparent>
                                        <Icon name='more'/>
                                    </Button>
                                </Right>
                            </CardItem>
                            <CardItem style={{height: 45}}>
                                <Left>
                                    <Button transparent onPress={() => {
                                        console.log('click');
                                    }}>
                                        <Icon name='heart-empty'/>
                                    </Button>
                                    <Button transparent>
                                        <Icon name='chatbubbles'/>
                                    </Button>
                                    <Button transparent>
                                        <Icon name='share-alt'/>
                                    </Button>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Text>1000 likes</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>This is why this show was so smart. Any other show would have presented this
                                        as
                                        the heroic
                                        sibling finally taking down his evil sibling and restoring honor to his nation.
                                        But
                                        this show
                                        knew what was really going on. And what was really going on was a brutal fight
                                        to
                                        the death
                                        between two teenaged siblings. One that had been abused all his life and one who
                                        had
                                        never been
                                        loved all her life. Theres nothing heroic about this. This is just messed up and
                                        sad
                                        and the
                                        music reflect this.</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </View>,
        );
    };
};
export default VideoComponent;
