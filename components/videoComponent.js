import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    FlatList,
    Image,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    Button, ListView
} from 'react-native';
import ViewOverflow from 'react-native-view-overflow';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        backgroundColor: 'transparent',
        paddingTop: 36,
        paddingHorizontal: 36,
        paddingBottom: 24,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    articles: {
        overflow: 'visible'
    },
    destination: {
        width: width - (36 * 2),
        height: width,
        borderRadius: 12,
        paddingHorizontal: 36,
        marginHorizontal: 36,
        paddingVertical: 24,
        overflow: 'visible'
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
        overflow: 'visible'
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
        overflow: 'visible'
    },

    recommemdations: {
        flex: 2,
        justifyContent: 'space-between',
    },
    recommemded: {
        padding: 36
    },
    avatar:
        {
            width: 36, height: 36, borderRadius: 18
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
        borderColor: "#007BFA",
        borderWidth: 2
    },
    recommendation: {
        width: (width - (36 * 2)),
        height: 500,
        borderRadius: 12,
        overflow: 'visible',
        // paddingHorizontal: 36,
        // paddingVertical: 24,
    }

});
const mocks = [
    {
        id: 1,
        user: {
            name: 'Lelia Chavez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        saved: true,
        location: 'Santorini, Greece',
        temperature: 34,
        title: 'Santorini',
        description: 'Santorini is one of the Cyclades islands in the Aegean Sea. ',
        rating: 4.3,
        reviews: 3212,
        preview: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        ]
    },
    {
        id: 2,
        user: {
            name: 'Lelia Chavez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        saved: false,
        location: 'Loutraki, Greece',
        temperature: 34,
        title: 'Loutraki',
        description: 'This attractive small town, 80 kilometers from Athens',
        rating: 4.6,
        reviews: 3212,
        preview: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
        ]
    },
    {
        id: 3,
        user: {
            name: 'Lelia Chavez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        saved: true,
        location: 'Santorini, Greece',
        temperature: 34,
        title: 'Santorini',
        description: 'Santorini - Description',
        rating: 3.2,
        reviews: 3212,
        preview: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
        ]
    },
    {
        id: 4,
        user: {
            name: 'Lelia Chavez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        location: 'Loutraki, Greece',
        temperature: 34,
        title: 'Loutraki',
        description: 'This attractive small town, 80 kilometers from Athens',
        rating: 5,
        reviews: 3212,
        preview: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
        ]
    },
]

class Articles extends Component {
    constructor(props) {
        super(props);
        this.props.onFetchVideos();
        this.state = {

            //     videos: this.props.videos,
            //     currentPage: 1,
            //     todosPerPage: 3
        };
        const pageVideo = this.props.videos.slice(1, 10);
        this.state = {
            pageVideo: pageVideo,
        }
        // console.log(this.props.videos);
    }


    static navigationOptions = {
        header: (
            <View style={[styles.row, styles.header,]}>
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
    };

    renderDots() {
        const {destinations} = this.props;
        return (
            <View style={[styles.flex, styles.row, {justifyContent: 'center', alignItems: 'center', marginTop: 10}]}>
                {destinations.map(item => {
                    return <View
                        key={`step-${item.id}`}
                        style={[styles.dots, item.id === 1 ? styles.activeDot : null]}/>
                })}
            </View>
        )
    };

    renderDestinations = () => {
        return (
            <View style={[styles.column, styles.destinations, styles.shadow, {elevation: 2}]}>
                <FlatList data={this.props.videos} renderItem={(rowData) => {
                    <View>
                        <Text>Hello</Text>
                    </View>
                }}>
                </FlatList>
                <FlatList horizontal
                          pagingEnabled
                          scrollEnabled
                          showsHorizontalScrollIndicator={false}
                          decelerationRate={0}
                          scrollEventThrottle={16}
                          snapToAlignment="center"
                    // ListEmptyComponent={this.emptyList}
                    // ListHeaderComponent={this.headerList}
                          ListFooterComponent={this.footerList}
                          onEndReached={this.handleLoadMore}
                          onEndReachedThreshold={0}
                          data={this.props.videos}
                          style={{overflow: 'visible', height: 360}}
                          keyExtractor={(item, index) => `${item.id}`}
                          renderItem={({item}) => (
                              <ViewOverflow style={[styles.shadow, {height: 400, overflow: 'visible'}]}>
                                  {this.renderDestination(item)}
                              </ViewOverflow>
                          )}
                />
                {this.renderDots()}

                {/*<Text>ok</Text>*/}
                {/*{renderTodos}*/}
            </View>
        );
    }
    handleLoadMore = () => {
        this.state.pageVideo = this.props.videos.slice(1, 20)
    }

    emptyList = () => {

    }
    headerList = () => {

    }
    footerList = () => {
        return (
            <View>
                {/*<TouchableOpacity activeOpacity={0.9} onPress={}>*/}
                {/*    <Button title={"loadmore"}></Button>*/}
                {/*    /!*{this.state.isLoadMore ? (*!/*/}
                {/*    /!*    <ActivityIndicator color='green' animating size="large"></ActivityIndicator>) : null}*!/*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }

    renderDestination = (item) => {
        // console.log(item.id);
        return (
            <View style={[styles.destination, styles.column, {marginLeft: -33, width: width * 1}]}>
                <ImageBackground
                    style={[styles.flex, styles.destination, styles.shadow]}
                    imageStyle={{borderRadius: 12}}
                    source={{uri: item.thumb}}
                >
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <View style={{flex: 0}}>
                            {/*<Image source={{ uri: item.user.avatar }} style={styles.avatar} />*/}
                        </View>
                        <View style={[styles.column, {flex: 2}]}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>{item.title}</Text>
                            <Text style={{color: 'white'}}>
                                <Text> {item.location}</Text>
                            </Text>
                        </View>
                        <View style={{flex: 0, justifyContent: 'center', alignItems: 'flex-end',}}>
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
                    <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 8,}}>
                        {item.title}
                    </Text>
                    <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'flex-end',}]}>
                        <Text style={{color: 'black'}}>
                            {item.title.split('').slice(0, 50)}...
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    renderRecommemded = () => {
        return (
            <View style={[styles.flex, styles.column, styles.recommemded]}>
                <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'baseline'}]}>
                    <Text style={{fontSize: 18}}>
                        Recommemeded
                    </Text>
                    <Text style={{color: '#BCCCD4'}}>
                        More
                    </Text>
                </View>
                <View style={[styles.column, styles.recommemdations, styles.shadow, {elevation: 2}]}>
                    <FlatList
                              pagingEnabled
                              scrollEnabled
                              decelerationRate={0}
                              scrollEventThrottle={16}
                              snapToAlignment="center"
                              data={this.props.videos}
                              style={{overflow: 'visible'}}
                              keyExtractor={(item, index) => `${item.id}`}
                              renderItem={({item}) => (
                                  <View>
                                      {this.renderRecommendation(item)}
                                  </View>
                              )}
                    />
                    {this.renderDots()}
                </View>
            </View>
        );
    }
    renderRecommendation = item => {
        return (
            <View style={[styles.column, styles.recommendation,]}>
                <Image style={[styles.flex,{height: 400}]} imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                                 source={{uri: item.thumb}}>
                </Image>
                <View style={[styles.flex,styles.column, styles.recommemdedInfo, styles.shadow]}>
                    <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 8,}}>
                        {item.title}
                    </Text>
                    <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'flex-end',}]}>
                        <Text style={{color: 'black'}}>
                            {item.title.split('').slice(0, 50)}...
                        </Text>
                    </View>
                </View>
            </View>

        )
    }

    render() {
        return (
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                {this.renderDestinations()}
                {this.renderRecommemded()}

            </ScrollView>
        )
    };
};
Articles.defaultProps = {
    destinations: mocks
};
export default Articles;
